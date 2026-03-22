const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkLoginError() {
  console.log('Testing login to capture the exact 500 error from Supabase...');
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@scatechsolar.com',
    password: 'scatechsolar123',
  });

  if (error) {
    console.error('------- DETAILED AUTH ERROR FROM SUPABASE -------');
    console.error('Name:', error.name);
    console.error('Message:', error.message);
    console.error('Status:', error.status);
    console.error('-------------------------------------------------');
  } else {
    console.log('Login succeeded! Session:', data.session ? 'Created' : 'None');
  }
}

checkLoginError();
