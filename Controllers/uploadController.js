const cloudinary = require('../helpers/imageUpload'); // Import Cloudinary configuration



const uploadImage = async (req, res) => {
    try {
        console.log(req.file)
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads', // Optional: Specify a folder in Cloudinary
        });

        // Return the Cloudinary URL
        res.status(200).json({   
            success: true,
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

module.exports = { uploadImage };