require('dotenv').config
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloudianary_url: process.env.CLOUDINARY_URL,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,

})

module.exports = cloudinary