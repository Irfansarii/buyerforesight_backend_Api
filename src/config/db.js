import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use /tmp for Render (ephemeral storage) or fallback to local for development
const isProduction = process.env.NODE_ENV === 'production';
const dbPath = isProduction
    ? '/tmp/database.sqlite'
    : path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Database opening error:', err);
    else console.log('Connected to SQLite database.');
});

// Table Create karna
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

export default db;