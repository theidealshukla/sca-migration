import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Advanced API Sliding Window Rate Limiter
// Enforces a strict maximum of 100 requests per minute per IP address to neutralize brute force/DDoS
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 100;
const RATE_LIMIT_WINDOW_MS = 60000;

function checkRateLimit(ip) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  const record = rateLimitMap.get(ip);
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  record.count += 1;
  return true;
}

// Zod Schema Allowlist for strict input validation & escaping payload pollution
const AdminActionSchema = z.object({
  action: z.enum(['create', 'update_password', 'update_details', 'delete']),
  email: z.string().email().max(255).optional(),
  password: z.string().min(6).max(255).optional(),
  role: z.enum(['admin', 'member']).optional(),
  name: z.string().max(255).optional(),
  userId: z.string().uuid().optional(),
});

// Server-side admin route requiring the SERVICE_ROLE_KEY to bypass RLS and manage auth.users
export async function POST(request) {
  try {
    // Execute Anti-DDoS Rate Limiting
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown_IP';
    if (!checkRateLimit(clientIp)) {
      console.warn(`[SECURITY LOCKDOWN] IP ${clientIp} exceeded rate limits (Blocked).`);
      return NextResponse.json({ error: 'Too Many Requests: Rate limit exceeded. Try again later.' }, { status: 429 });
    }
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Access Denied: Missing or malformed authorization header.' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    // Explicitly verify the JWT securely using local Anon client
    const supabaseAnon = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data: authDataCheck, error: authErrorCheck } = await supabaseAnon.auth.getUser(token);
    if (authErrorCheck || !authDataCheck?.user) {
      return NextResponse.json({ error: 'Access Denied: Invalid or expired session.' }, { status: 403 });
    }

    const rawPayload = await request.json();
    
    // 1. Strict Payload Validation (Length, Types, Allowlist)
    const validation = AdminActionSchema.safeParse(rawPayload);
    if (!validation.success) {
      // Prevent stack trace or schema leak by mapping to generic error.
      console.warn("API Payload Validation Failed: ", validation.error.errors);
      return NextResponse.json({ error: 'Validation failed: Invalid parameters provided.' }, { status: 400 });
    }

    const { action, email, password, role, name, userId } = validation.data;

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // Enforce strict Role-Based Access Control (RBAC). Only Admins can invoke actions here.
    const { data: profile } = await supabaseAdmin.from('users').select('role').eq('id', authDataCheck.user.id).single();
    if (!profile || profile.role !== 'admin') {
      console.warn(`[SECURITY LOCKDOWN] User ${authDataCheck.user.email} attempted to breach Admin User Management Endpoint.`);
      return NextResponse.json({ error: 'Forbidden: You do not possess the required security clearances.' }, { status: 403 });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY in .env.local to manage users' }, { status: 500 });
    }

    if (action === 'create') {
      let finalUserId = null;

      // 1. Attempt to cleanly provision user
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          // User exists in auth layer. Find their internal ID to assign the role seamlessly
          const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
          const existing = listData.users.find(u => u.email === email);
          if (existing) {
            finalUserId = existing.id;
            // Forcibly update their password since Admin explicitly filled it out
            await supabaseAdmin.auth.admin.updateUserById(finalUserId, { password });
          } else {
            return NextResponse.json({ error: 'User exists but trace failed.' }, { status: 400 });
          }
        } else {
          return NextResponse.json({ error: authError.message }, { status: 400 });
        }
      } else {
        finalUserId = authData.user.id;
      }

      // 2. Lock them into the application's role permissions
      if (finalUserId) {
        const { error: dbError } = await supabaseAdmin
          .from('users')
          .upsert({
            id: finalUserId,
            email,
            name: name || email.split('@')[0],
            role: role || 'member'
          });

        if (dbError) {
          return NextResponse.json({ error: dbError.message }, { status: 400 });
        }
      }

      await supabaseAdmin.from('system_logs').insert([{
        user_email: 'System Admin', 
        user_role: 'admin',
        action_type: 'USER_CREATED',
        entity_type: 'USER',
        entity_id: finalUserId,
        description: `Provisioned a new team member: ${email}`
      }]);

      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (action === 'update_password') {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: password,
      });
      if (error) throw error;
      
      await supabaseAdmin.from('system_logs').insert([{
        user_email: 'System Admin', 
        user_role: 'admin',
        action_type: 'PASSWORD_CHANGED',
        entity_type: 'USER',
        entity_id: userId,
        description: `Forcefully rotated authentication password for user ID: ${userId}`
      }]);
      
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (action === 'update_details') {
      const { error: dbError } = await supabaseAdmin
        .from('users')
        .update({ name, role })
        .eq('id', userId);

      if (dbError) throw dbError;

      await supabaseAdmin.from('system_logs').insert([{
        user_email: 'System Admin', 
        user_role: 'admin',
        action_type: 'USER_EDITED',
        entity_type: 'USER',
        entity_id: userId,
        description: `Updated profile details for team member ID: ${userId}`
      }]);

      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (action === 'delete') {
      // 1. Delete from our public scope first to prevent FK validation errors
      const { error: dbError } = await supabaseAdmin.from('users').delete().eq('id', userId);
      if (dbError) throw dbError;

      // 2. Erase the raw authentication identity from the Supabase infrastructure layer.
      const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
      if (authError) throw authError;

      await supabaseAdmin.from('system_logs').insert([{
        user_email: 'System Admin', 
        user_role: 'admin',
        action_type: 'USER_DELETED',
        entity_type: 'USER',
        entity_id: userId,
        description: `Permanently removed team member access for ID: ${userId}`
      }]);

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
