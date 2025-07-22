/*
  # Create students table
  1. New Table: students (id uuid, name text, email text, roll_number text, father_name text, date_of_birth date, mobile_number_1 text, mobile_number_2 text, gender text, address text, admission_date date, academy_id text, transport_use text, id_number text, field_1 text, field_2 text, student_id text, batch text, created_at timestamp)
  2. Security: Enable RLS, add policies for academy admins to manage students within their academy.
*/
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  roll_number text,
  father_name text NOT NULL,
  date_of_birth date NOT NULL,
  mobile_number_1 text NOT NULL,
  mobile_number_2 text,
  gender text NOT NULL,
  address text,
  admission_date date NOT NULL,
  academy_id text NOT NULL REFERENCES public.academies(academy_key) ON DELETE CASCADE, -- References academy_key from academies table
  transport_use text,
  id_number text,
  field_1 text,
  field_2 text,
  student_id text UNIQUE NOT NULL, -- Unique student ID
  batch text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Policy for academy admins to view students in their academy
CREATE POLICY "Academy admins can view students." ON students
  FOR SELECT TO authenticated
  USING (academy_id = (auth.jwt() ->> 'academy_key')::text);

-- Policy for academy admins to insert students in their academy
CREATE POLICY "Academy admins can insert students." ON students
  FOR INSERT TO authenticated
  WITH CHECK (academy_id = (auth.jwt() ->> 'academy_key')::text AND (auth.jwt() ->> 'role')::text = 'academy');

-- Policy for academy admins to update students in their academy
CREATE POLICY "Academy admins can update students." ON students
  FOR UPDATE TO authenticated
  USING (academy_id = (auth.jwt() ->> 'academy_key')::text)
  WITH CHECK (academy_id = (auth.jwt() ->> 'role')::text = 'academy');

-- Policy for academy admins to delete students in their academy
CREATE POLICY "Academy admins can delete students." ON students
  FOR DELETE TO authenticated
  USING (academy_id = (auth.jwt() ->> 'academy_key')::text AND (auth.jwt() ->> 'role')::text = 'academy');
