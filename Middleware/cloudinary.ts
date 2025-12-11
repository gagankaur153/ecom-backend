import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary, ConfigOptions } from 'cloudinary'
import { Request } from 'express'

const cloudOptions: ConfigOptions = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY

}
cloudinary.config(cloudOptions)

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req: Request, file: Express.Multer.File) => {
        return {
            folder: "ecom",
            allowed_formats: ["jpg", "jpeg", "png"],
            public_id: file.originalname.split('.')[0]
        }
    }
})

const cloudinaryfileuploader = multer({
    storage: storage
})

export {
    cloudinaryfileuploader
}