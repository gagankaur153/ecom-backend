import express from 'express'
const { addproduct, getallproduct, updateproduct, getsingleproduct, deleteproduct } = require('../controllers/productcontroller')
import {cloudinaryfileuploader} from '../Middleware/cloudinary'
import {authmiddleware} from '../Middleware/usermiddleware'
const router = express.Router()

router.post('/addproduct', authmiddleware, cloudinaryfileuploader.single("image"), addproduct)
router.get('/allproduct', getallproduct)
router.get('/singleproduct/:productid', getsingleproduct)
router.put('/updateproduct/:productid', authmiddleware, authmiddleware, cloudinaryfileuploader.single("image"), updateproduct)
router.delete('/deleteproduct/:productid', authmiddleware, deleteproduct)

export default router