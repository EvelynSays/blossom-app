import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const auth = async (req, res, next) => {
    // Check if the request has the Authorization header
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'You are not authorized.' });        
    }

    // Extract the token from the Authorization header
    const token = authorization.split(' ')[1];

    try {
        // Decode and extract the user id from the token
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);

        // Save the user to the request object
        req.user = await User.findById(_id).select('_id');

        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export default auth;