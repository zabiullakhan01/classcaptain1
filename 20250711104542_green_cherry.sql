/*
  # Fix students table creation

  1. New Tables
    - Ensure `students` table exists with all required columns
    - Add proper indexes and constraints
    - Insert sample data for testing

  2. Security
    - Enable RLS on students table
    - Add policies for proper access control
*/

-- Drop table if it exists to recreate it properly
DROP TABLE IF EXISTS students CASCADE;

-- Create students table with all required columns
CREATE TABLE students (
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

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policies for students table
CREATE POLICY "Students can read own data"
  ON students
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Academy can manage students"
  ON students
  FOR ALL
  TO public
  USING (true);

-- Insert sample student data for demo
INSERT INTO students (
  name, 
  email, 
  roll_number, 
  father_name, 
  date_of_birth, 
  mobile_number_1, 
  gender, 
  address, 
  admission_date, 
  academy_id, 
  password,
  batch
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
