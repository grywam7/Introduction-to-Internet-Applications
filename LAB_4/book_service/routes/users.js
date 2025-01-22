const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Ensure the User model is correctly defined and imported

const router = express.Router();

// Register Endpoint (POST /api/register)
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password: password });
        res.status(201).json({ id: user.id });
    } catch (error) {
        res.status(400).json({ error: "Email already in use" });
    }
});

// Login Endpoint (POST /api/login)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (password != user.password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

