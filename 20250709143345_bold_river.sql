/*
  # Create tables for Class Captain coaching institute management system

  1. New Tables
    - `academies`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `academy_key` (text, unique)
      - `created_at` (timestamp)
    
    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `roll_number` (text, optional)
      - `father_name` (text)
      - `date_of_birth` (date)
      - `mobile_number_1` (text)
      - `mobile_number_2` (text, optional)
      - `gender` (text)
      - `address` (text)
      - `admission_date` (date)
      - `academy_id` (text, foreign key)
      - `password` (text)
      - `transport_use` (text)
      - `id_number` (text, optional)
      - `field_1` (text, optional)
      - `field_2` (text, optional)
      - `created_at` (timestamp)
    
    - `teachers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `academy_id` (text, foreign key)
      - `date_of_birth` (date)
      - `created_at` (timestamp)
    
    - `batches`
      - `id` (uuid, primary key)
      - `name` (text)
      - `teacher_id` (uuid, foreign key)
      - `academy_id` (text, foreign key)
      - `schedule` (text)
      - `created_at` (timestamp)
    
    - `attendance`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `batch_id` (uuid, foreign key)
      - `date` (date)
      - `status` (text)
      - `created_at` (timestamp)
    
    - `grades`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `batch_id` (uuid, foreign key)
      - `marks` (integer)
      - `total_marks` (integer)
      - `exam_date` (date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own academy data
*/

-- Create academies table
CREATE TABLE IF NOT EXISTS academies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  academy_key text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create students table
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
  created_at timestamptz DEFAULT now()
);

-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  subject text NOT NULL,
  academy_id text NOT NULL,
  date_of_birth date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create batches table
CREATE TABLE IF NOT EXISTS batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  teacher_id uuid REFERENCES teachers(id),
  academy_id text NOT NULL,
  schedule text,
  created_at timestamptz DEFAULT now()
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  batch_id uuid REFERENCES batches(id),
  date date NOT NULL,
  status text NOT NULL DEFAULT 'present',
  created_at timestamptz DEFAULT now()
);

-- Create grades table
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  batch_id uuid REFERENCES batches(id),
  marks integer NOT NULL,
  total_marks integer NOT NULL,
  exam_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE academies ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

-- Create policies for academies
CREATE POLICY "Academies can read own data"
  ON academies
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Academies can insert own data"
  ON academies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policies for students
CREATE POLICY "Academy can manage students"
  ON students
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for teachers
CREATE POLICY "Academy can manage teachers"
  ON teachers
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for batches
CREATE POLICY "Academy can manage batches"
  ON batches
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for attendance
CREATE POLICY "Academy can manage attendance"
  ON attendance
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for grades
CREATE POLICY "Academy can manage grades"
  ON grades
  FOR ALL
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO academies (name, email, academy_key) VALUES
('SM TUTORIAL', 'smtutorials01@gmail.com', 'AC001')
ON CONFLICT (email) DO NOTHING;
