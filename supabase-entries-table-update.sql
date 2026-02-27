-- Add user_id column to entries table
ALTER TABLE entries
ADD COLUMN user_id uuid;

-- Optionally, add foreign key constraint to auth.users
ALTER TABLE entries
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES auth.users(id);
