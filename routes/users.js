const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const usersService = require('../services/usersService');

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ message: 'Missing required fields: name, email, password' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        const newUser = usersService.createUser({ name, email, passwordHash: hash });

        const { password: _password, ...userWithoutPassword } = newUser;

        res.json({
            message: 'User created successfully!',
            user: userWithoutPassword,
        });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Missing required fields: email, password' });
    }

    const user = usersService.findUserByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid Email Address' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error comparing passwords' });
        }

        if (!result) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const { password: _password, ...userWithoutPassword } = user;

        res.json({
            message: 'Login successful!',
            user: userWithoutPassword,
        });
    });
});

module.exports = router;
