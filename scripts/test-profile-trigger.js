// This script helps test if the profile trigger is working correctly
// It doesn't execute the test directly as that requires Supabase credentials

const { createClient } = require('@supabase/supabase-js');

console.log('\n=== Profile Trigger Test Guide ===\n');
console.log('To test if the profile trigger is working correctly, follow these steps:\n');

console.log('1. Make sure you have set up your environment variables:');
console.log('   - NEXT_PUBLIC_SUPABASE_URL');
console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY\n');

console.log('2. Sign up a new test user through the application');
console.log('   - Go to the signup page');
console.log('   - Fill in the required information');
console.log('   - Submit the form\n');

console.log('3. Verify in Supabase that a profile was created:');
console.log('   - Go to your Supabase dashboard');
console.log('   - Navigate to the "Table Editor"');
console.log('   - Select the "profiles" table');
console.log('   - Look for a row with the email you used for signup\n');

console.log('4. Alternative: Run a SQL query to check:');
console.log('   ```sql');
console.log('   SELECT * FROM profiles WHERE email = \'your-test-email@example.com\';');
console.log('   ```\n');

console.log('5. If no profile was created, check the troubleshooting guide at:');
console.log('   docs/troubleshooting.md\n');

console.log('=== Manual Test with Supabase Client ===\n');
console.log('You can also test the signup process programmatically:');
console.log('```javascript');
console.log('const { createClient } = require(\'@supabase/supabase-js\');');
console.log('const supabase = createClient(');
console.log('  process.env.NEXT_PUBLIC_SUPABASE_URL,');
console.log('  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
console.log(');');
console.log('');
console.log('async function testSignup() {');
console.log('  // 1. Sign up a new user');
console.log('  const { data: authData, error: authError } = await supabase.auth.signUp({');
console.log('    email: "test-user@example.com",');
console.log('    password: "test-password-123",');
console.log('    options: {');
console.log('      data: {');
console.log('        name: "Test User",');
console.log('        company: "Test Company",');
console.log('        role: "Tester",');
console.log('        phone: "123-456-7890"');
console.log('      }');
console.log('    }');
console.log('  });');
console.log('');
console.log('  if (authError) {');
console.log('    console.error("Error signing up:", authError);');
console.log('    return;');
console.log('  }');
console.log('');
console.log('  console.log("User signed up successfully:", authData);');
console.log('');
console.log('  // 2. Wait a moment for the trigger to execute');
console.log('  await new Promise(resolve => setTimeout(resolve, 2000));');
console.log('');
console.log('  // 3. Check if a profile was created');
console.log('  const { data: profileData, error: profileError } = await supabase');
console.log('    .from("profiles")');
console.log('    .select("*")');
console.log('    .eq("email", "test-user@example.com")');
console.log('    .single();');
console.log('');
console.log('  if (profileError) {');
console.log('    console.error("Error fetching profile:", profileError);');
console.log('    return;');
console.log('  }');
console.log('');
console.log('  if (profileData) {');
console.log('    console.log("Profile created successfully:", profileData);');
console.log('  } else {');
console.log('    console.log("Profile was not created. The trigger might not be working.");');
console.log('  }');
console.log('}');
console.log('');
console.log('testSignup();');
console.log('```');