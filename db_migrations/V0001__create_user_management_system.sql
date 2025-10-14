-- Таблица пользователей (администраторы и горничные)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'maid')),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица адресов для уборки
CREATE TABLE IF NOT EXISTS cleaning_addresses (
    id SERIAL PRIMARY KEY,
    address TEXT NOT NULL,
    client_name VARCHAR(255),
    client_phone VARCHAR(50),
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('basic', 'deep', 'after', 'office')),
    area INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица назначений (кто убирает какой адрес)
CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    address_id INTEGER NOT NULL REFERENCES cleaning_addresses(id),
    maid_id INTEGER NOT NULL REFERENCES users(id),
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(address_id, maid_id)
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_cleaning_addresses_status ON cleaning_addresses(status);
CREATE INDEX IF NOT EXISTS idx_cleaning_addresses_date ON cleaning_addresses(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_assignments_maid ON assignments(maid_id);
CREATE INDEX IF NOT EXISTS idx_assignments_address ON assignments(address_id);

-- Добавляем тестового администратора (пароль: admin123)
INSERT INTO users (email, password_hash, full_name, role, phone) 
VALUES ('admin@p9clean.ru', '$2b$10$rXZxMxVBQGQf5F5F5F5F5.', 'Администратор', 'admin', '+7 999 999 99 99')
ON CONFLICT (email) DO NOTHING;
