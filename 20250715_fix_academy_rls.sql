/*
  # Fix RLS policies for academies table
  1. Revoke existing broad policies.
  2. Add specific RLS policies for academies:
     - INSERT: Allow anon/authenticated to insert their own academy (user_id = auth.uid()).
     - SELECT: Allow authenticated to select their own academy (user_id = auth.uid()).
     - UPDATE: Allow authenticated to update their own academy (user_id = auth.uid()).
     - DELETE: Allow authenticated to delete their own academy (user_id = auth.uid()).
*/

-- Revoke existing policies on academies table to replace them with more secure ones
DROP POLICY IF EXISTS "Allow public insert for registration" ON academies;
DROP POLICY IF EXISTS "Allow public select for login verification" ON academies;
DROP POLICY IF EXISTS "Allow authenticated updates" ON academies;

-- Policy for academies to insert their own data during registration
-- Allows both anonymous users (during signup) and authenticated users to create their own academy record,
-- ensuring the user_id matches the current authenticated user's ID.
CREATE POLICY "Academies can insert their own data" ON academies
  FOR INSERT TO anon, authenticated
  WITH CHECK (user_id = auth.uid());

-- Policy for academies to read their own data
-- Allows only authenticated users to view their own academy record.
CREATE POLICY "Academies can view their own data" ON academies
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Policy for academies to update their own data
-- Allows only authenticated users to update their own academy record.
CREATE POLICY "Academies can update their own data" ON academies
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Policy for academies to delete their own data
-- Allows only authenticated users to delete their own academy record.
CREATE POLICY "Academies can delete their own data" ON academies
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());
