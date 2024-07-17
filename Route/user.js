const { Router } = require('express');
const User = require('../Models/user');
const { randomBytes, createHmac } = require('crypto');
const { createTokenForUser } = require('../authenticate/auth');

const route = Router();

route.post('/signin', async (req, res) => {
    const { email, name, password, profilePic } = req.body;
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            salt: salt, // Ensure salt is stored
            profilePic
        });

        console.log(user);
        const token = createTokenForUser(user);
        res.cookie('token', token);
        res.status(201).json({ success: true, authToken: token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

route.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    console.log("Cookie removed");
    res.json({ message: 'Logged out successfully' });
});

route.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const salt = user.salt;
        const hash = createHmac('sha256', salt).update(password).digest('hex');

        if (user.password !== hash) {
            return res.status(401).json({ message: 'Invalid  password' });
        }

        const token = createTokenForUser(user)

        res.cookie('authToken', token, { httpOnly: true, secure: false, sameSite: 'Strict' });
        res.json({ success: true, authToken: token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = route;
