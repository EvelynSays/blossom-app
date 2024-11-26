import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config.js';
import jwt from 'jsonwebtoken';


// Creating JWT
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: '10d'
    });
};

// Register User
const registerUser = async (req, res) => {
    // Destructure email and password from req.body
    const { email, password } = req.body;

    // Check fields are not empty
    if (!email || !password) {
        return res.status(400).json({ error: 'Both fields are required.' });
    }

    // Check if email already exists
    const exist = await User.findOne({ email });
    if (exist) {
        return res.status(400).json({ error: 'An account already exists with provided email.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        // Registering the user
        const user = await User.create({ email, password: hashedPassword });
        // Create JWT
        const token = createToken(user._id);
        // Send the response
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    // Destructure email and password from req.body
    const { email, password } = req.body;

    // Check fields are not empty
    if (!email || !password) {
        return res.status(400).json({ error: 'Both fields are required.' });
    }

    // Check if email already exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'An account with provided email cannot be found.' });
    }

    // Check if password is correct
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ error: 'Incorrect Password' });
    }

    try {
        // Create JWT
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { registerUser, loginUser };