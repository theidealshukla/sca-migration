import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Initialize Supabase inside the handler so it only runs at request time,
    // not during Netlify's build-time static analysis (where env vars don't exist)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    const body = await req.json();
    const { name, phone, email, city, type, message } = body;

    if (!name || !phone || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Insert into Supabase securely
    const { data: lead, error: dbError } = await supabase.from('website_leads').insert([{
      name,
      phone,
      email: email || null,
      source: 'Website Form',
      status: 'new',
      metadata: {
        city,
        system_type: type,
        message,
      },
      notes: '',
    }]).select().single();

    if (dbError) throw dbError;

    // Log the lead
    await supabase.from('system_logs').insert([{
      user_email: 'Website Visitor',
      user_role: 'system',
      action_type: 'LEAD_CAPTURED',
      entity_type: 'LEAD',
      entity_id: lead.id,
      description: `New website lead: ${name} from ${city}`
    }]);

    // 2. Setup Nodemailer Transporter
    // Make sure the user provides these environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, 
      },
    });

    // 3. Email 1: Confirmation to the Customer
    if (email) {
      const customerMailOptions = {
        from: `"SCA Tech Solar" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for contacting SCA Tech Solar! ☀️',
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #03a9f4;">Hello ${name},</h2>
            <p>Thank you for reaching out to SCA Tech Solar. We have received your request for a Free Solar Survey for a <strong>${type}</strong> installation in <strong>${city}</strong>.</p>
            <p>Our engineering expert will review your details and call you shortly at <strong>${phone}</strong> to confirm the exact time and schedule.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 14px; color: #777;">
              SCA Tech Solar - India's Trusted EPC Company.<br>
              Phone: +91 98260 35454<br>
              Email: info@scatechsolar.com
            </p>
          </div>
        `,
      };
      
      try {
        await transporter.sendMail(customerMailOptions);
      } catch (custMailError) {
        console.error('Failed to send customer confirmation:', custMailError);
        // Continue even if customer mail fails
      }
    }

    // 4. Email 2: Alert the Admin Panel / Sales Team
    // Let's grab all active admins to map emails, or simply send to a master email.
    // For simplicity, we send it to an environment variable ALERTS_EMAIL (e.g., admin@scatechsolar.com).
    const adminAlertEmail = process.env.ALERTS_EMAIL || process.env.EMAIL_USER;

    if (adminAlertEmail) {
      const adminMailOptions = {
        from: `"SCA Bot" <${process.env.EMAIL_USER}>`,
        to: adminAlertEmail,
        subject: `🚨 NEW LEAD: ${name} (${city}) - ${type}`,
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #ff5722; margin-top: 0;">New Website Lead Generated</h2>
            <p>A new customer has filled out the contact form. Their details are automatically logged in the Supabase CRM.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${email || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">City:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${city}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Project Type:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${type}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Message:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${message || 'No additional message'}</td>
              </tr>
            </table>
            <div style="margin-top: 25px; text-align: center;">
              <a href="https://scatechsolar.com/admin/leads" style="background-color: #03a9f4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Open CRM Panel</a>
            </div>
          </div>
        `,
      };

      try {
        await transporter.sendMail(adminMailOptions);
      } catch (adminMailError) {
        console.error('Failed to send admin alert:', adminMailError);
      }
    }

    // 5. Push lead to Google Sheets (additive — does not affect existing flow)
    try {
      await fetch('https://script.google.com/macros/s/AKfycbyPbhyqkiZBU4-g70AC9uOYR-aixp0cDQZp5PkeLo8ZkqxTgSwritVw6KC2_wv2DU9w/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, city, type, message }),
      });
    } catch (sheetError) {
      console.error('Failed to push to Google Sheets:', sheetError);
      // Silently fail — don't break the main flow
    }

    return NextResponse.json({ success: true, lead });

  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
