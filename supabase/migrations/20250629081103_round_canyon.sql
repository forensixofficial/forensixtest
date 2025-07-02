/*
  # Add LinkedIn column to profiles table

  1. Changes
    - Add linkedin column to profiles table
    - Add index for better performance

  2. Security
    - No changes to existing RLS policies
*/

-- Add linkedin column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS linkedin text;

-- Create index for linkedin column where it's not null
CREATE INDEX IF NOT EXISTS profiles_linkedin_idx ON profiles(linkedin) WHERE linkedin IS NOT NULL;