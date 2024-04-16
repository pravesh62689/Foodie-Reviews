const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Import route files
const routes = require('./routes/userRoutes');

// Middleware setup
app.use(morgan('dev')); // Logging middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON data

// Define routes
// Combine all routes into a single routes file
app.use('/api', routes);

// Serve static files (e.g., images) from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Foodie Reviews API!');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;
