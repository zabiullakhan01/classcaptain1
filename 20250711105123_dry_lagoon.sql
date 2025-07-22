/*
  # Fix Academy Registration Issues

  1. Ensure academies table exists with proper structure
  2. Fix RLS policies for registration
  3. Add proper indexes and constraints
  4. Ensure API access is working

  This migration fixes registration failures by ensuring:
  - Table exists with correct structure
  - RLS policies allow anonymous registration
  - Proper constraints and validation
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

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON academies;
DROP POLICY IF EXISTS "Enable read for all users" ON academies;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON academies;
DROP POLICY IF EXISTS "Allow public registration" ON academies;
DROP POLICY IF EXISTS "Allow public read" ON academies;
DROP POLICY IF EXISTS "Public can register academies" ON academies;
DROP POLICY IF EXISTS "Public can read academies for login" ON academies;

-- Create new policies for registration
CREATE POLICY "Allow anonymous registration" ON academies
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read for login" ON academies
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated updates" ON academies
  FOR UPDATE TO authenticated
  USING (true);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_academies_email ON academies(email);
CREATE INDEX IF NOT EXISTS idx_academies_academy_key ON academies(academy_key);

-- Ensure the table is accessible via REST API
GRANT SELECT, INSERT, UPDATE ON academies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON academies TO authenticated;
