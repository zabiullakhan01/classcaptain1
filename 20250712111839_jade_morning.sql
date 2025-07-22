/*
  # Add student and teacher ID fields for enhanced login

  1. Table Updates
    - Add `student_id` field to students table for unique identification
    - Add `teacher_id` field to teachers table for unique identification
    - Update date format handling for DD/MM/YYYY format

  2. Indexes
    - Add indexes for performance on new ID fields
    - Ensure uniqueness constraints

  3. Sample Data
    - Update existing demo data with proper IDs
*/

-- Add student_id column to students table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'students' AND column_name = 'student_id'
  ) THEN
    ALTER TABLE students ADD COLUMN student_id text UNIQUE;
  END IF;
END $$;

-- Add teacher_id column to teachers table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'teachers' AND column_name = 'teacher_id'
  ) THEN
    ALTER TABLE teachers ADD COLUMN teacher_id text UNIQUE;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id);
CREATE INDEX IF NOT EXISTS idx_teachers_teacher_id ON teachers(teacher_id);
CREATE INDEX IF NOT EXISTS idx_students_dob_academy ON students(date_of_birth, academy_id);
CREATE INDEX IF NOT EXISTS idx_teachers_dob_academy ON teachers(date_of_birth, academy_id);
CREATE INDEX IF NOT EXISTS idx_students_student_id_academy ON students(student_id, academy_id);
CREATE INDEX IF NOT EXISTS idx_teachers_teacher_id_academy ON teachers(teacher_id, academy_id);

-- Update existing students with generated student IDs if they don't have one
UPDATE students 
SET student_id = 'STU' || LPAD((ROW_NUMBER() OVER (ORDER BY created_at))::text, 4, '0')
WHERE student_id IS NULL;

-- Update existing teachers with generated teacher IDs if they don't have one
UPDATE teachers 
SET teacher_id = 'TCH' || LPAD((ROW_NUMBER() OVER (ORDER BY created_at))::text, 4, '0')
WHERE teacher_id IS NULL;

-- Update demo student with specific student ID
UPDATE students 
SET student_id = 'STU2025009'
WHERE name = 'SAFA MARYAM' AND academy_id = 'AC001'
AND student_id IS NULL;

-- Update demo teacher with specific teacher ID
UPDATE teachers 
SET teacher_id = 'TCH001'
WHERE name = 'Sarah Wilson' AND academy_id = 'AC001'
AND teacher_id IS NULL;
