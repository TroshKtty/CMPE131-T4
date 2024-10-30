const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/auth_model');
require('dotenv').config();

const register = async (req, res) => {
    const { email, username, password, phone_no, role } = req.body;

    try {
        if (!['Customer', 'Admin', 'Employee'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role entered' });
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already taken. Please select a different username.' });
        }

        const hashed_password = await bcrypt.hash(password, 10);
        const approved = role === 'Customer';

        await User.create({
            email,
            username,
            hashed_password,
            phone_no,
            role,
            approved,
        });

        const message = approved 
            ? 'Registration Successful. Have fun shopping!' 
            : 'Approval from Admin/Employee Pending. Contact proper supervisor for approval';

        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong during registration' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const secret_key = process.env.JWT_secret;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        if (!user.approved) {
            return res.status(403).json({ message: 'Approval pending. Contact supervisor.' });
        }

        const token = jwt.sign(
            { user_id: user.id, role: user.role },
            secret_key,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.status(200).json({ message: 'Login successful', role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong during login' });
    }
};

module.exports = { register, login };
