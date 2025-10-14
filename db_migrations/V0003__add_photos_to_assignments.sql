-- Add photo columns to assignments table
ALTER TABLE assignments 
ADD COLUMN photo_before TEXT,
ADD COLUMN photo_after TEXT,
ADD COLUMN photos_uploaded_at TIMESTAMP;