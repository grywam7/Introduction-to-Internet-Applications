const sqlite3 = require("sqlite3").verbose();

// Connect to the database (creates it if it doesn't exist)
const db = new sqlite3.Database("books.db");

// Create tables if they don't exist
db.serialize(() => {
    // Create the "books" table
    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            author TEXT NOT NULL,
            year INTEGER NOT NULL
        )
    `);

    // Create the "orders" table
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            book_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (book_id) REFERENCES books (id)
        )
    `);
});

module.exports = db;

