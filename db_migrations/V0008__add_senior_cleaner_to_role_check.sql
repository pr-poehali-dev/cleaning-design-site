-- Remove old CHECK constraint on role column
ALTER TABLE users DROP CONSTRAINT users_role_check;

-- Add new CHECK constraint with senior_cleaner role included
ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'maid', 'senior_cleaner'));