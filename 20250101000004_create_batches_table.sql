/*
  # Create batches table
  1. New Table: batches (id uuid, name text, subject text, teacher_id uuid, academy_id text, schedule text, start_date date, end_date date, max_students integer, fees numeric, description text, created_at timestamp)
  2. Security: Enable RLS, add policies for academy admins to manage batches within their academy.
*/
CREATE TABLE IF NOT EXISTS batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  teacher_id uuid REFERENCES public.teachers(id) ON DELETE SET NULL, -- References teachers table
  academy_id text NOT NULL REFERENCES public.academies(academy_key) ON DELETE CASCADE, -- References academy_key from academies table
  schedule text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  max_students integer,
  fees numeric,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE batches ENABLE ROW LEVEL SECURITY;

-- Policy for academy admins to view batches in their academy
CREATE POLICY "Academy admins can view batches." ON batches
  FOR SELECT TO authenticated
  USING (academy_id = (auth.jwt() ->> 'academy_key')::text);

-- Policy for academy admins to insert batches in their academy
CREATE POLICY "Academy admins can insert batches." ON batches
  FOR INSERT TO authenticated
  WITH CHECK (academy_id = (auth.jwt() ->> 'academy_key')::text AND (auth.jwt() ->> 'role')::text = 'academy');

-- Policy for academy admins to update batches in their academy
CREATE POLICY "Academy admins can update batches." ON batches
  FOR UPDATE TO authenticated
  USING (academy_id = (auth.jwt() ->> 'academy_key')::text)
  WITH CHECK (academy_id = (auth.jwt() ->> 'role')::text = 'academy');

-- Policy for academy admins to delete batches in their academy
CREATE POLICY "Academy admins can delete batches." ON batches
  FOR DELETE TO authenticated
  USING (academy_id = (auth.jwt() ->> 'academy_key')::text AND (auth.jwt() ->> 'role')::text = 'academy');
