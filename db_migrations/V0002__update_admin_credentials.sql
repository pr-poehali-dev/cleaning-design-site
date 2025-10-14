-- Update admin credentials
UPDATE users 
SET email = 'hab-agent@mail.ru', password_hash = '3Dyzaape29938172' 
WHERE role = 'admin' AND email = 'admin@p9clean.ru';