/*
  # Remove password columns from academies and students tables
  1. Alter Table: academies - Drop password column
  2. Alter Table: students - Drop password column
  Reason: Passwords will now be managed by Supabase Auth (auth.users table).
*/
ALTER TABLE academies
DROP COLUMN IF EXISTS password;

ALTER TABLE students
DROP COLUMN IF EXISTS password;
