const multer = require ('multer')
const {CloudinaryStorage}= require ('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
    
})

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params: {
        folder: "ecom",
        allowed_formats: ["jpg", "jpeg", "png"],
        public_id: (req,file)=> file.originalname.split('.')[0]
    }
})

const cloudinaryfileuploader = multer({
    storage:storage
})

module.exports = cloudinaryfileuploader