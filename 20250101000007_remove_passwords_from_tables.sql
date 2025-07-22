/*
  # Remove password columns from academies and students tables
  1. Alter Tables: academies, students - Drop 'password' column if it exists.
  2. Rationale: Passwords are now managed solely by Supabase Auth.
*/
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'academies' AND column_name = 'password') THEN
        ALTER TABLE academies DROP COLUMN password;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'password') THEN
        ALTER TABLE students DROP COLUMN password;
    END IF;
END $$;
