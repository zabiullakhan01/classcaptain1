/*
  # Create academies table for registration

  1. New Tables
    - `academies` table with all required columns
    - Proper indexes for performance

  2. Security
    - Enable RLS with policies for anonymous registration
    - Grant necessary permissions to all roles

  3. Sample Data
    - Insert demo academy for testing
*/

-- Drop table if exists to start fresh
DROP TABLE IF EXISTS academies CASCADE;

-- Create academies table
CREATE TABLE academies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  academy_key text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE academies ENABLE ROW LEVEL SECURITY;

-- Create policies for registration and login
CREATE POLICY "Allow anonymous insert for registration" ON academies
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public select for login" ON academies
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated update" ON academies
  FOR UPDATE TO authenticated
  USING (true);

-- Grant permissions to all roles
GRANT ALL ON academies TO anon;
GRANT ALL ON academies TO authenticated;
GRANT ALL ON academies TO public;

-- Grant sequence permissions for UUID generation
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO public;

-- Create indexes for performance
CREATE INDEX idx_academies_email ON academies(email);
CREATE INDEX idx_academies_academy_key ON academies(academy_key);

-- Insert demo data
INSERT INTO academies (name, email, academy_key) VALUES
('SM TUTORIAL', 'smtutorials01@gmail.com', 'AC001'),
('Demo Academy', 'academy@demo.com', 'DEMO123')
ON CONFLICT (email) DO NOTHING;
