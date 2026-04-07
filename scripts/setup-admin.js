const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupAdmin() {
  console.log('Start provisioning admin...');
  
  // 1. Create the user using Supabase Admin API
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: 'admin@scatechsolar.com',
    password: 'scatechsolar123',
    email_confirm: true,
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
      console.log('User already registered in Auth layer. Proceeding to sync public.users.');
    } else {
      console.error('Auth Error:', authError.message);
      return;
    }
  }

  // Fetch the created user or existing user
  let userId;
  if (authData?.user) {
    userId = authData.user.id;
  } else {
    // try to fetch the id
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const existing = usersData.users.find(u => u.email === 'admin@scatechsolar.com');
    if (existing) userId = existing.id;
  }

  if (userId) {
    // 2. Insert into public.users natively
    // Note: If you get "schema error" from the trigger, this bypasses the SQL trigger issues
    // by ensuring we update the row manually if the trigger failed previously.
    const { error: dbError } = await supabase.from('users').upsert({
      id: userId,
      email: 'admin@scatechsolar.com',
      name: 'Administrator',
      role: 'admin'
    });

    if (dbError) {
        console.log('Warning: Could not insert into public.users (table might be missing or trigger failed):', dbError.message);
    } else {
        console.log('Successfully provisioned admin in public.users!');
    }
  }
}

setupAdmin();
