"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { addproduct, getallproduct, updateproduct, getsingleproduct, deleteproduct } = require('../controllers/productcontroller');
const cloudinary_1 = require("../Middleware/cloudinary");
const usermiddleware_1 = require("../Middleware/usermiddleware");
const router = express_1.default.Router();
router.post('/addproduct', usermiddleware_1.authmiddleware, cloudinary_1.cloudinaryfileuploader.single("image"), addproduct);
router.get('/allproduct', getallproduct);
router.get('/singleproduct/:productid', getsingleproduct);
router.put('/updateproduct/:productid', usermiddleware_1.authmiddleware, usermiddleware_1.authmiddleware, cloudinary_1.cloudinaryfileuploader.single("image"), updateproduct);
router.delete('/deleteproduct/:productid', usermiddleware_1.authmiddleware, deleteproduct);
exports.default = router;
