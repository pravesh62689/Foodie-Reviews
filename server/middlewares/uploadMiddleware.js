const multer = require('multer');

// Configure storage options for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the upload directory
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Create a unique filename using the current timestamp and original file name
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    },
});

// Create an instance of multer with the configured storage options
const upload = multer({ storage });

// Export the upload middleware
module.exports = upload;

// Usage in routes (example)
const express = require('express');
const router = express.Router();

// Import the upload middleware
const uploadMiddleware = require('./uploadMiddleware');

// Define a route for handling file uploads
router.post('/upload', uploadMiddleware.single('file'), (req, res) => {
    // `req.file` contains information about the uploaded file
    if (req.file) {
        // File upload was successful
        res.status(200).json({
            message: 'File uploaded successfully',
            file: req.file,
        });
    } else {
        // No file was uploaded
        res.status(400).json({
            message: 'No file uploaded',
        });
    }
});

module.exports = router;
