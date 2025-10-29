-- Add senior cleaner fields to assignments table
ALTER TABLE t_p9439657_cleaning_design_site.assignments 
ADD COLUMN senior_cleaner_id INTEGER NULL REFERENCES t_p9439657_cleaning_design_site.users(id),
ADD COLUMN inspection_checklist_data JSONB NULL,
ADD COLUMN inspection_started_at TIMESTAMP NULL,
ADD COLUMN inspection_completed_at TIMESTAMP NULL,
ADD COLUMN senior_cleaner_salary NUMERIC(10,2) NULL;

-- Add comment for clarity
COMMENT ON COLUMN t_p9439657_cleaning_design_site.assignments.senior_cleaner_id IS 'ID старшего клинера для проверки';
COMMENT ON COLUMN t_p9439657_cleaning_design_site.assignments.inspection_checklist_data IS 'Чек-лист проверки качества уборки';
COMMENT ON COLUMN t_p9439657_cleaning_design_site.assignments.senior_cleaner_salary IS 'Зарплата старшего клинера за проверку';