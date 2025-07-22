/*
  # Create academies table
  1. New Table: academies (id uuid, name text, email text, academy_key text, user_id uuid, created_at timestamp)
  2. Security: Enable RLS, add policies for SELECT, INSERT, UPDATE for the owning user.
*/
CREATE TABLE IF NOT EXISTS academies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  academy_key text UNIQUE NOT NULL, -- This is the key used for other tables
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE academies ENABLE ROW LEVEL SECURITY;

-- Policy for academies to read their own data
CREATE POLICY "Academies can view their own data." ON academies
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Policy for academies to insert their own data
CREATE POLICY "Academies can insert their own data." ON academies
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Policy for academies to update their own data
CREATE POLICY "Academies can update their own data." ON academies
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());
