/*
  # Add LinkedIn column to profiles table

  1. Changes
    - Add `linkedin` column to profiles table
    - Update RLS policies to include the new column
*/

-- Add linkedin column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS linkedin text;

-- Update the index to include linkedin for better performance
CREATE INDEX IF NOT EXISTS profiles_linkedin_idx ON profiles(linkedin) WHERE linkedin IS NOT NULL;