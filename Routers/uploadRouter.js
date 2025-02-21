const express = require('express');
const router = express.Router();
const upload = require('../Middleware/multer'); // Import Multer configuration
const { uploadImage } = require('../Controllers/uploadController'); // Import controller

// Route for uploading an image
router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;