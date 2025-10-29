-- Add checklist column to assignments table
ALTER TABLE t_p9439657_cleaning_design_site.assignments 
ADD COLUMN checklist_data JSONB NULL,
ADD COLUMN checklist_started_at TIMESTAMP NULL;