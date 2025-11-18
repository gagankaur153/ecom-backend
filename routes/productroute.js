const express = require('express')
const { addproduct, getallproduct, updateproduct, getsingleproduct, deleteproduct } = require('../controllers/productcontroller')
const cloudinaryfileuploader = require('../Middleware/cloudinary')
const authmiddleware = require('../Middleware/usermiddleware')
const router = express.Router()

router.post('/addproduct', authmiddleware, cloudinaryfileuploader.single("image"), addproduct)
router.get('/allproduct', getallproduct)
router.get('/singleproduct/:productid', getsingleproduct)
router.put('/updateproduct/:productid', authmiddleware, authmiddleware, cloudinaryfileuploader.single("image"), updateproduct)
router.delete('/deleteproduct/:productid', authmiddleware, deleteproduct)

module.exports = router