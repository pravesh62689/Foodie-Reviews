const User = require('../models/User'); // Import the User model

// Middleware function to check if the user has admin privileges
const checkAdmin = async (req, res, next) => {
    try {
        // Retrieve the user ID from the request object (you may be storing it in `req.userId`)
        const userId = req.user.id || req.userId;

        // Fetch the user from the database using their ID
        const user = await User.findById(userId);

        // Check if the user exists and if they have an admin role
        if (user && user.role === 'admin') {
            // User is an admin, allow them to proceed to the next middleware or route handler
            next();
        } else {
            // User is not an admin, return an error response
            res.status(403).json({ message: 'Forbidden: You do not have admin privileges' });
        }
    } catch (error) {
        // Handle any errors that occur
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = checkAdmin;
