/*
  # Create teachers table
  1. New Table: teachers (id uuid, name text, email text, subject text, academy_id text, date_of_birth date, created_at timestamp)
  2. Security: Enable RLS, add policies for academy admins to manage teachers within their academy.
*/
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  subject text NOT NULL,
  academy_id text NOT NULL REFERENCES public.academies(academy_key) ON DELETE CASCADE, -- References academy_key from academies table
  date_of_birth date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- Policy for academy admins to view teachers in their academy
CREATE POLICY "Academy admins can view teachers." ON teachers
  FOR SELECT TO authenticated
  USING (academy_id = (auth.jwt() ->> 'academy_key')::text);

-- Policy for academy admins to insert teachers in their academy
CREATE POLICY "Academy admins can insert teachers." ON teachers
  FOR INSERT TO authenticated
  WITH CHECK (academy_id = (auth.jwt() ->> 'academy_key')::text AND (auth.jwt() ->> 'role')::text = 'academy');

-- Policy for academy admins to update teachers in their academy
CREATE POLICY "Academy admins can update teachers." ON teachers
  FOR UPDATE TO authenticated
  USING (academy_id = (auth.jwt() ->> 'academy_key')::text)
  WITH CHECK (academy_id = (auth.jwt() ->> 'role')::text = 'academy');

-- Policy for academy admins to delete teachers in their academy
CREATE POLICY "Academy admins can delete teachers." ON teachers
  FOR DELETE TO authenticated
  USING (academy_id = (auth.jwt() ->> 'academy_key')::text AND (auth.jwt() ->> 'role')::text = 'academy');
