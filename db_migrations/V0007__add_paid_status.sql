-- Add paid status to assignments table
ALTER TABLE t_p9439657_cleaning_design_site.assignments ADD COLUMN IF NOT EXISTS paid BOOLEAN DEFAULT FALSE;