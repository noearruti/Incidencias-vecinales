import { createTables } from 'turso';

async function setupDatabase() {
    // Define the SQL commands to create tables
    const commands = [
        `CREATE TABLE IF NOT EXISTS incidents (\n            id SERIAL PRIMARY KEY,\n            description TEXT NOT NULL,\n            status VARCHAR(50) NOT NULL,\n            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n        )`,
        `CREATE TABLE IF NOT EXISTS residents (\n            id SERIAL PRIMARY KEY,\n            name VARCHAR(100) NOT NULL,\n            email VARCHAR(100) UNIQUE NOT NULL\n        )`,
        `CREATE TABLE IF NOT EXISTS reports (\n            id SERIAL PRIMARY KEY,\n            incident_id INTEGER REFERENCES incidents(id),\n            resident_id INTEGER REFERENCES residents(id),\n            report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n        )`
    ];

    try {
        // Execute each command to create tables
        for (let command of commands) {
            await createTables(command);
        }
        console.log('Database setup complete.');
    } catch (error) {
        console.error('Error setting up database:', error);
    }
}

setupDatabase();