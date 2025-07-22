/*
  # Fix RLS policies for academy registration

  1. Changes
    - Update INSERT policy on academies table to allow public access for registration
    - Update SELECT policy on academies table to allow public access for login verification
    
  2. Security Notes
    - These changes allow unauthenticated users to register academies and verify login credentials
    - Consider implementing additional validation in application logic for production use
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Academies can read own data" ON academies;
DROP POLICY IF EXISTS "Academies can insert own data" ON academies;

-- Create new policies that allow public access for registration and login
CREATE POLICY "Public can register academies"
  ON academies
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can read academies for login"
  ON academies
  FOR SELECT
  TO public
  USING (true);
