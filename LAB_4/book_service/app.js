const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const app = express();
const jwt = require("jsonwebtoken");
const authenticate = require("./middlewares/authenticate");

app.use(bodyParser.json());

const usersRoutes = require("./routes/users");

// Middleware
app.use(bodyParser.json());

// User Routes
app.use("/api", usersRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// GET /api/books - Retrieve all books
app.get("/api/books", (req, res) => {
    db.all("SELECT * FROM books", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// GET /api/books/:id - Retrieve a book by ID
app.get("/api/books/:id", (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: "Book not found" });
            return;
        }
        res.json(row);
    });
});

app.post("/api/books", authenticate , async (req, res) => {
    const { name, author, year } = req.body;

    // Validate input
    if (!name || !author || !year) {
        return res.status(400).json({ error: "All fields (name, author, year) are required" });
    }

    db.run(
        "INSERT INTO books (name, author, year) VALUES (?, ?, ?)",
        [name, author, year],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        }
    );
});


// DELETE /api/books/:id - Delete a book by ID
app.delete("/api/books/:id",authenticate, (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "Book not found" });
            return;
        }
        res.status(204).send();
    });
});


app.get("/api/orders/:user_id", (req, res) => {
    const userId = req.params.user_id;
    db.all(
        "SELECT * FROM orders WHERE user_id = ?",
        [userId],
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        }
    );
});


app.post("/api/orders",authenticate, (req, res) => {
    const { user_id, book_id, quantity } = req.body;

    // Check if the book exists
    db.get("SELECT * FROM books WHERE id = ?", [book_id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: "Book not found" });
            return;
        }

        // Add the order
        db.run(
            "INSERT INTO orders (user_id, book_id, quantity) VALUES (?, ?, ?)",
            [user_id, book_id, quantity],
            function (err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(201).json({ order_id: this.lastID });
            }
        );
    });
});


app.delete("/api/orders/:order_id",authenticate, (req, res) => {
    const orderId = req.params.order_id;

    db.run("DELETE FROM orders WHERE id = ?", [orderId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        res.status(204).send();
    });
});


app.patch("/api/orders/:order_id",authenticate, (req, res) => {
    const orderId = req.params.order_id;
    const { quantity } = req.body;

    db.run(
        "UPDATE orders SET quantity = ? WHERE id = ?",
        [quantity, orderId],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(404).json({ error: "Order not found" });
                return;
            }
            res.status(200).json({ message: "Order updated successfully" });
        }
    );
});

