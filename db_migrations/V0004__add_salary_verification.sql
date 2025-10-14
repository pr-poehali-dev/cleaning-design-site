-- Add salary and verification fields to assignments table
ALTER TABLE assignments 
ADD COLUMN salary DECIMAL(10,2),
ADD COLUMN verified_at TIMESTAMP,
ADD COLUMN verified_by INTEGER REFERENCES users(id);

-- Add status field to better track workflow
ALTER TABLE assignments 
ADD COLUMN status VARCHAR(50) DEFAULT 'assigned';

-- Create index for faster queries
CREATE INDEX idx_assignments_status ON assignments(status);