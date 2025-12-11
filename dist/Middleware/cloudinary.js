"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryfileuploader = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("cloudinary");
const cloudOptions = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
};
cloudinary_1.v2.config(cloudOptions);
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, file) => {
        return {
            folder: "ecom",
            allowed_formats: ["jpg", "jpeg", "png"],
            public_id: file.originalname.split('.')[0]
        };
    }
});
const cloudinaryfileuploader = (0, multer_1.default)({
    storage: storage
});
exports.cloudinaryfileuploader = cloudinaryfileuploader;
