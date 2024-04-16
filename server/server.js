const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
require('./config');

const PORT = process.env.PORT || 5000;

// Handle server start errors
const startServer = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Failed to start the server: ${error.message}`);
        process.exit(1); // Exit with an error code
    }
};

// Handle graceful shutdown
const gracefulShutdown = () => {
    console.log('Shutting down the server...');
    app.close(() => {
        console.log('Server shut down gracefully.');
        process.exit(0); // Exit cleanly
    });
};

// Listen for process termination signals and handle shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start the server
startServer();
