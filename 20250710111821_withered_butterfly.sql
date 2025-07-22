/*
  # Fix academies table REST API access

  1. Security Updates
    - Ensure academies table has proper RLS policies for public access
    - Add policy to allow anonymous users to read academy information for registration
  
  2. Table Verification
    - Verify academies table exists with correct structure
    - Ensure proper indexes and constraints
*/

-- Ensure the academies table exists with proper structure
CREATE TABLE IF NOT EXISTS academies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  academy_key text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on academies table
ALTER TABLE academies ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access to academies" ON academies;
DROP POLICY IF EXISTS "Allow authenticated users to read academies" ON academies;

-- Create policy to allow public read access to academies table
-- This is needed for the registration page to fetch academy information
CREATE POLICY "Allow public read access to academies"
  ON academies
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policy to allow authenticated users to manage their own academy
CREATE POLICY "Allow academy owners to manage their academy"
  ON academies
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM academy_users WHERE academy_id = academies.id
  ));

-- Ensure academy_users table exists for the policy above
CREATE TABLE IF NOT EXISTS academy_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  academy_id uuid REFERENCES academies(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, academy_id)
);

-- Enable RLS on academy_users table
ALTER TABLE academy_users ENABLE ROW LEVEL SECURITY;

-- Create policy for academy_users
CREATE POLICY "Users can manage their academy relationships"
  ON academy_users
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert some sample academies if none exist (for testing)
INSERT INTO academies (name, email, academy_key)
SELECT 'Demo Academy', 'demo@academy.com', 'DEMO123'
WHERE NOT EXISTS (SELECT 1 FROM academies WHERE academy_key = 'DEMO123');

INSERT INTO academies (name, email, academy_key)
SELECT 'Test School', 'admin@testschool.edu', 'TEST456'
WHERE NOT EXISTS (SELECT 1 FROM academies WHERE academy_key = 'TEST456');
