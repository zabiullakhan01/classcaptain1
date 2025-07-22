/*
  # Fix academy registration and ensure all tables work properly

  1. Tables
    - Ensure academies table exists with proper structure
    - Ensure students table exists with proper structure  
    - Ensure teachers table exists with proper structure
    - Ensure batches table exists with proper structure
    - Ensure attendance table exists with proper structure
    - Ensure grades table exists with proper structure

  2. Security
    - Enable RLS on all tables
    - Add proper policies for public registration and authenticated access
    - Allow anonymous users to register academies
    - Allow authenticated users to manage their data

  3. Sample Data
    - Insert demo data for testing
*/

-- Create academies table if not exists
CREATE TABLE IF NOT EXISTS academies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  academy_key text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create students table if not exists
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  roll_number text,
  father_name text NOT NULL,
  date_of_birth date NOT NULL,
  mobile_number_1 text NOT NULL,
  mobile_number_2 text,
  gender text NOT NULL DEFAULT 'Male',
  address text,
  admission_date date NOT NULL,
  academy_id text NOT NULL,
  password text NOT NULL,
  transport_use text DEFAULT 'NO TRANSPORT USE',
  id_number text,
  field_1 text,
  field_2 text,
  batch text DEFAULT 'SSLC - B1',
  created_at timestamptz DEFAULT now()
);

-- Create teachers table if not exists
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  subject text NOT NULL,
  academy_id text NOT NULL,
  date_of_birth date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create batches table if not exists
CREATE TABLE IF NOT EXISTS batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  teacher_id uuid REFERENCES teachers(id),
  academy_id text NOT NULL,
  schedule text,
  created_at timestamptz DEFAULT now()
);

-- Create attendance table if not exists
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  batch_id uuid REFERENCES batches(id),
  date date NOT NULL,
  status text NOT NULL DEFAULT 'present',
  created_at timestamptz DEFAULT now()
);

-- Create grades table if not exists
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  batch_id uuid REFERENCES batches(id),
  marks integer NOT NULL,
  total_marks integer NOT NULL,
  exam_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE academies ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public registration" ON academies;
DROP POLICY IF EXISTS "Allow public read" ON academies;
DROP POLICY IF EXISTS "Allow authenticated read" ON academies;
DROP POLICY IF EXISTS "Public can register academies" ON academies;
DROP POLICY IF EXISTS "Public can read academies for login" ON academies;

-- Create policies for academies table
CREATE POLICY "Enable insert for anonymous users" ON academies
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON academies
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Enable update for authenticated users" ON academies
  FOR UPDATE TO authenticated USING (true);

-- Create policies for students table
DROP POLICY IF EXISTS "Students can read own data" ON students;
DROP POLICY IF EXISTS "Academy can manage students" ON students;

CREATE POLICY "Enable read for all users" ON students
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users" ON students
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON students
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Enable delete for authenticated users" ON students
  FOR DELETE TO authenticated USING (true);

-- Create policies for teachers table
DROP POLICY IF EXISTS "Academy can manage teachers" ON teachers;

CREATE POLICY "Enable all operations for authenticated users" ON teachers
  FOR ALL TO authenticated USING (true);

-- Create policies for batches table
DROP POLICY IF EXISTS "Academy can manage batches" ON batches;

CREATE POLICY "Enable all operations for authenticated users" ON batches
  FOR ALL TO authenticated USING (true);

-- Create policies for attendance table
DROP POLICY IF EXISTS "Academy can manage attendance" ON attendance;

CREATE POLICY "Enable all operations for authenticated users" ON attendance
  FOR ALL TO authenticated USING (true);

-- Create policies for grades table
DROP POLICY IF EXISTS "Academy can manage grades" ON grades;

CREATE POLICY "Enable all operations for authenticated users" ON grades
  FOR ALL TO authenticated USING (true);

-- Insert sample data for demo
INSERT INTO academies (name, email, academy_key) VALUES
('SM TUTORIAL', 'smtutorials01@gmail.com', 'AC001'),
('Demo Academy', 'demo@academy.com', 'DEMO123')
ON CONFLICT (email) DO NOTHING;

-- Insert sample students
INSERT INTO students (
  name, email, roll_number, father_name, date_of_birth, mobile_number_1, 
  gender, address, admission_date, academy_id, password, batch
) VALUES 
(
  'SAFA MARYAM',
  'safa.maryam@ac001.com',
  '2025009',
  'Mohammed Maryam',
  '1990-01-01',
  '9341771761',
  'Female',
  'Bangalore, Karnataka',
  '2024-04-01',
  'AC001',
  'student123',
  'SSLC - B1'
),
(
  'John Doe',
  'john.doe@ac001.com',
  '2025001',
  'Robert Doe',
  '1990-01-01',
  '9876543210',
  'Male',
  'Bangalore, Karnataka',
  '2024-04-01',
  'AC001',
  'student123',
  'SSLC - B1'
)
ON CONFLICT (id) DO NOTHING;

-- Insert sample teachers
INSERT INTO teachers (name, email, subject, academy_id, date_of_birth) VALUES
('Sarah Wilson', 'sarah.wilson@ac001.com', 'Mathematics', 'AC001', '1985-05-15'),
('John Smith', 'john.smith@ac001.com', 'Physics', 'AC001', '1980-03-20')
ON CONFLICT (id) DO NOTHING;

-- Insert sample batches
INSERT INTO batches (name, teacher_id, academy_id, schedule) VALUES
('SSLC - B1', (SELECT id FROM teachers WHERE email = 'sarah.wilson@ac001.com' LIMIT 1), 'AC001', '18:45'),
('SSLC - B2', (SELECT id FROM teachers WHERE email = 'sarah.wilson@ac001.com' LIMIT 1), 'AC001', '18:45'),
('10th ICSE (SCIENCE)', (SELECT id FROM teachers WHERE email = 'john.smith@ac001.com' LIMIT 1), 'AC001', '16:45'),
('II PUC (SCIENCE)', (SELECT id FROM teachers WHERE email = 'john.smith@ac001.com' LIMIT 1), 'AC001', '18:45'),
('I PUC (SCIENCE)', (SELECT id FROM teachers WHERE email = 'sarah.wilson@ac001.com' LIMIT 1), 'AC001', '18:45'),
('II PUC (COMMERCE)', (SELECT id FROM teachers WHERE email = 'sarah.wilson@ac001.com' LIMIT 1), 'AC001', '18:45'),
('10th ICSE (COMMERCE)', (SELECT id FROM teachers WHERE email = 'john.smith@ac001.com' LIMIT 1), 'AC001', '16:30')
ON CONFLICT (id) DO NOTHING;
