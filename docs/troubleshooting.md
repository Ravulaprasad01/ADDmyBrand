# Troubleshooting Guide

## Profile-Related Issues

### Problem: Profile Not Created After Signup

If a user's profile is not automatically created after signup, follow these steps:

1. **Verify Database Setup**
   - Make sure you've executed both SQL scripts in your Supabase project:
     - `scripts/create-tables.sql`
     - `scripts/create-profile-trigger.sql`
   - You can run `npm run setup-db` to see the SQL scripts that need to be executed.

2. **Check Trigger Installation**
   - In your Supabase dashboard, go to the SQL Editor
   - Run the following query to verify the trigger exists:
     ```sql
     SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
     ```
   - If no results are returned, the trigger is not installed. Re-run the `create-profile-trigger.sql` script.

3. **Verify Function Installation**
   - Run the following query to check if the function exists:
     ```sql
     SELECT * FROM pg_proc WHERE proname = 'handle_new_user';
     ```
   - If no results are returned, the function is not installed. Re-run the `create-profile-trigger.sql` script.

4. **Test the Trigger Manually**
   - You can test if the trigger works by inserting a test user directly into the `auth.users` table (this requires admin access):
     ```sql
     INSERT INTO auth.users (id, email, raw_user_meta_data) 
     VALUES (
       gen_random_uuid(), 
       'test@example.com',
       '{"name": "Test User", "company": "Test Company", "role": "Tester", "phone": "123-456-7890"}'::jsonb
     );
     ```
   - Then check if a corresponding profile was created:
     ```sql
     SELECT * FROM profiles WHERE email = 'test@example.com';
     ```

5. **Check for Errors in Function**
   - If the trigger is installed but not working, there might be errors in the function. Try simplifying the function to just insert the basic fields:
     ```sql
     CREATE OR REPLACE FUNCTION public.handle_new_user()
     RETURNS TRIGGER AS $$
     BEGIN
       INSERT INTO public.profiles (id, email)
       VALUES (NEW.id, NEW.email);
       RETURN NEW;
     END;
     $$ LANGUAGE plpgsql SECURITY DEFINER;
     ```

### Problem: Cannot Access Profile Data After Login

If a user can log in but their profile data is not accessible:

1. **Check Row Level Security (RLS) Policies**
   - Verify that the RLS policies for the `profiles` table are correctly set up
   - The policy should allow users to select their own profile
   - Run the following query to check existing policies:
     ```sql
     SELECT * FROM pg_policies WHERE tablename = 'profiles';
     ```

2. **Verify Profile Exists**
   - Check if the profile actually exists in the database:
     ```sql
     SELECT * FROM profiles WHERE id = 'user-id-here';
     ```
   - Replace 'user-id-here' with the actual user ID

3. **Check Supabase Client Configuration**
   - Ensure that the Supabase client is correctly configured with the right URL and anon key
   - Check that the client is initialized before any data access attempts

4. **Inspect Network Requests**
   - Use browser developer tools to inspect network requests
   - Look for requests to the Supabase API and check for any errors

## Environment Configuration Issues

1. **Verify Environment Variables**
   - Make sure your `.env.local` file contains the correct Supabase URL and anon key:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

2. **Check for CORS Issues**
   - If you're getting CORS errors, make sure your Supabase project has the correct URL in the allowed origins
   - Go to your Supabase dashboard > Authentication > URL Configuration

## Storage-Related Issues

### Problem: StorageApiError: Bucket not found

If you encounter a "Bucket not found" error when trying to upload files, follow these steps:

1. **Verify Storage Bucket Setup**
   - Make sure you've executed the `scripts/create-tables.sql` script in your Supabase project
   - This script creates the necessary 'avatars' bucket and sets up permissions

2. **Check Bucket Existence**
   - In your Supabase dashboard, go to the Storage section
   - Verify that an 'avatars' bucket exists
   - If it doesn't exist, run the following SQL in the SQL Editor:
     ```sql
     INSERT INTO storage.buckets (id, name, public) 
     VALUES ('avatars', 'avatars', true)
     ON CONFLICT (id) DO NOTHING;
     ```

3. **Verify Storage Policies**
   - Check that the appropriate policies are set up for the bucket:
     ```sql
     SELECT * FROM storage.policies WHERE bucket_id = 'avatars';
     ```
   - If no policies exist, run the following SQL:
     ```sql
     CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
       FOR SELECT USING (bucket_id = 'avatars');

     CREATE POLICY "Users can upload their own avatar" ON storage.objects
       FOR INSERT WITH CHECK (
         bucket_id = 'avatars' 
         AND auth.uid()::text = (storage.foldername(name))[1]
       );

     CREATE POLICY "Users can update their own avatar" ON storage.objects
       FOR UPDATE WITH CHECK (
         bucket_id = 'avatars' 
         AND auth.uid()::text = (storage.foldername(name))[1]
       );
     ```

## General Debugging Tips

1. **Enable Detailed Logging**
   - Add console logs in key functions to track the flow of data
   - Pay special attention to authentication state changes and profile data retrieval

2. **Use Supabase Dashboard**
   - The Supabase dashboard provides tools for monitoring database operations
   - Check the Auth section for user creation events
   - Use the SQL Editor to run queries and verify data

3. **Check Browser Console**
   - Many errors will be reported in the browser console
   - Look for network request failures or JavaScript errors

4. **Restart Development Server**
   - Sometimes, simply restarting the development server can resolve issues
   - Run `npm run dev` to restart the server