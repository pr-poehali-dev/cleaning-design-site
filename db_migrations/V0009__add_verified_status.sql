-- Добавляем статус 'verified' в список допустимых значений для cleaning_addresses
ALTER TABLE cleaning_addresses DROP CONSTRAINT IF EXISTS cleaning_addresses_status_check;
ALTER TABLE cleaning_addresses ADD CONSTRAINT cleaning_addresses_status_check 
CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'verified', 'cancelled'));