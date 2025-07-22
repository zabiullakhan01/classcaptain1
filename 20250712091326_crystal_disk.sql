/*
  # Fix Academy Registration - Final Solution

  1. Table Structure
    - Ensure academies table exists with correct structure
    - Add proper constraints and indexes

  2. Security & Permissions
    - Enable RLS with proper policies for registration
    - Grant necessary permissions to anon users
    - Allow public registration and login verification

  3. API Access
    - Ensure REST API can access the table
    - Fix any permission issues
*/

-- Ensure academies table exists with proper structure
CREATE TABLE IF NOT EXISTS academies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  academy_key text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE academies ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON academies;
DROP POLICY IF EXISTS "Enable read for all users" ON academies;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON academies;
DROP POLICY IF EXISTS "Allow anonymous registration" ON academies;
DROP POLICY IF EXISTS "Allow public read for login" ON academies;
DROP POLICY IF EXISTS "Allow authenticated updates" ON academies;
DROP POLICY IF EXISTS "Public can register academies" ON academies;
DROP POLICY IF EXISTS "Public can read academies for login" ON academies;
DROP POLICY IF EXISTS "Allow public registration" ON academies;
DROP POLICY IF EXISTS "Allow public read" ON academies;
DROP POLICY IF EXISTS "Allow authenticated read" ON academies;
DROP POLICY IF EXISTS "Allow public read access to academies" ON academies;
DROP POLICY IF EXISTS "Allow academy owners to manage their academy" ON academies;

-- Create comprehensive policies for registration and login
CREATE POLICY "Allow public insert for registration" ON academies
  FOR INSERT TO anon, public
  WITH CHECK (true);

CREATE POLICY "Allow public select for login verification" ON academies
  FOR SELECT TO anon, public, authenticated
  USING (true);

CREATE POLICY "Allow authenticated updates" ON academies
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete" ON academies
  FOR DELETE TO authenticated
  USING (true);

-- Grant explicit permissions to ensure API access
GRANT ALL ON academies TO anon;
GRANT ALL ON academies TO authenticated;
GRANT ALL ON academies TO public;

-- Grant usage on the sequence for ID generation
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO public;

-- Ensure the table is exposed via PostgREST
COMMENT ON TABLE academies IS 'Academy registration and management table';

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_academies_email ON academies(email);
CREATE INDEX IF NOT EXISTS idx_academies_academy_key ON academies(academy_key);

-- Insert demo data if it doesn't exist
INSERT INTO academies (name, email, academy_key) 
VALUES ('SM TUTORIAL', 'smtutorials01@gmail.com', 'AC001')
ON CONFLICT (email) DO NOTHING;

-- Verify table permissions
DO $$
BEGIN
  -- Check if table exists and is accessible
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'academies') THEN
    RAISE NOTICE 'Academies table exists and should be accessible';
  ELSE
    RAISE EXCEPTION 'Academies table does not exist';
  END IF;
END $$;
