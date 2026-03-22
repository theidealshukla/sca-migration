import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const logSystemActivity = async (actionType, entityType, description, entityId = null) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const email = session?.user?.email || 'admin@scatechsolar.com';
    
    await supabase.from('system_logs').insert([{
      user_email: email,
      user_role: email.includes('admin') ? 'admin' : 'member',
      action_type: actionType,
      entity_type: entityType,
      entity_id: entityId,
      description
    }]);
  } catch (err) {
    console.error('System log error:', err);
  }
};
