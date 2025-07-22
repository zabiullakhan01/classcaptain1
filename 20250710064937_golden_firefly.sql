/*
  # Add demo student and teacher data

  1. Demo Data
    - Add demo student with DOB 01/01/1990 for academy AC001
    - Add demo teacher with DOB 15/05/1985 for academy AC001

  2. Purpose
    - Enable demo login functionality for students and teachers
    - Provide test data for the application
*/

-- Insert demo student
INSERT INTO students (
  name,
  email,
  father_name,
  date_of_birth,
  mobile_number_1,
  gender,
  address,
  admission_date,
  academy_id,
  password
) VALUES (
  'John Doe',
  'john.doe@ac001.com',
  'Robert Doe',
  '1990-01-01',
  '+919876543210',
  'Male',
  '123 Demo Street, Demo City',
  '2024-01-01',
  'AC001',
  'DEMO1234'
) ON CONFLICT DO NOTHING;

-- Insert demo teacher
INSERT INTO teachers (
  name,
  email,
  subject,
  academy_id,
  date_of_birth
) VALUES (
  'Sarah Wilson',
  'sarah.wilson@ac001.com',
  'Mathematics',
  'AC001',
  '1985-05-15'
) ON CONFLICT DO NOTHING;

-- Insert demo batches
INSERT INTO batches (
  name,
  teacher_id,
  academy_id,
  schedule
) VALUES (
  'Mathematics A',
  (SELECT id FROM teachers WHERE email = 'sarah.wilson@ac001.com' LIMIT 1),
  'AC001',
  'Mon, Wed, Fri 9:00 AM - 10:30 AM'
),
(
  'Mathematics B',
  (SELECT id FROM teachers WHERE email = 'sarah.wilson@ac001.com' LIMIT 1),
  'AC001',
  'Tue, Thu, Sat 10:00 AM - 11:30 AM'
) ON CONFLICT DO NOTHING;
