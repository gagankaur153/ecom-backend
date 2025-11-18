const express = require ('express')
const { addcart, allcart, quantitydecrease, deletecart, quantityincrease, updateAllProduct } = require('../controllers/cartcontroller')
const authmiddleware = require('../Middleware/usermiddleware')
const router = express.Router()

router.post('/addcart/:productid', authmiddleware, addcart)

router.get('/allcart', authmiddleware, allcart)

router.put('/decrease/:productid', authmiddleware, quantitydecrease)

router.put('/increase/:productid', authmiddleware, quantityincrease)

router.put('/removecart/:productid', authmiddleware, deletecart)

router.put('/deletecart', authmiddleware, updateAllProduct)



module.exports = router