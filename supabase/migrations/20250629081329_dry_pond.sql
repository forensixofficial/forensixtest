/*
# Update Profiles Schema

1. Schema Updates
   - Add linkedin column to profiles table
   - Update existing table structure to match application requirements

2. Security
   - Maintain existing RLS policies
   - Add index for linkedin column for better performance

3. Data Integrity
   - Ensure all columns match the application interface
   - Add proper constraints and defaults
*/

-- Add linkedin column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'linkedin'
  ) THEN
    ALTER TABLE profiles ADD COLUMN linkedin text;
  END IF;
END $$;

-- Create index for linkedin column where it's not null
CREATE INDEX IF NOT EXISTS profiles_linkedin_idx ON profiles(linkedin) WHERE linkedin IS NOT NULL;

-- Ensure all required columns exist with proper types
DO $$
BEGIN
  -- Check and add missing columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'inserted_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN inserted_at timestamptz DEFAULT now();
  END IF;
  
  -- Update existing created_at to inserted_at if needed
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'created_at'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'inserted_at'
  ) THEN
    ALTER TABLE profiles RENAME COLUMN created_at TO inserted_at;
  END IF;
END $$;

-- Ensure updated_at trigger exists
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger to ensure it works
DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();