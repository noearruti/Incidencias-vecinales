-- SQL script for creating all tables, indexes, policies, and functions for the incidencias vecinales application

-- Creating tables
CREATE TABLE incidencias (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating indexes
CREATE INDEX idx_incidencias_status ON incidencias(status);

-- Creating policies
CREATE POLICY select_incidencias ON incidencias FOR SELECT TO public;

-- Functions
CREATE FUNCTION update_timestamp() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_incidencias_timestamp
BEFORE UPDATE ON incidencias
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
