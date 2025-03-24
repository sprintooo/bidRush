const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// user - id, name, email, password
const users = []

router.post('/register', (req, res) => {
    var user = req.body;

    if (!user.name || !user.email || !user.password) {
        return res.status(400).json({ message: "Missing required fields: name, email, password" });
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password" });
        }

        const newUser = { id: Date.now(), name: user.name, email: user.email, password: hash };

        users.push(newUser);

        const { password, ...userWithoutPassword } = newUser;

        res.json({
            message: "User created successfully!",
            user: userWithoutPassword
        });
    });
});


router.post('/login', (req, res) => {
    var { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Missing required fields: email, password" });
    }

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ message: "Invalid Email Address" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error comparing passwords" });
        }

        if (!result) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const { password, ...userWithoutPassword } = user;

        res.json({
            message: "Login successful!",
            user: userWithoutPassword
        });
    });
});


module.exports = router;