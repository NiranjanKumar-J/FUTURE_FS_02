const express = require('express');
const User = require('../models/User');
const router = express.Router();

// 1. REGISTER ROUTE (Sign Up) 📝
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists!" });

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: "User Registered Successfully! ✅" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. LOGIN ROUTE (Sign In) 🔑
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found!" });

        // Check password (Simple check for now)
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        res.json({ message: "Login Successful! 🚀", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;