const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If token is not provided, return an error
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, jwtSecret);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // If token verification fails, return an error
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
