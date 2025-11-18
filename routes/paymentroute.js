const express = require ('express')
const {Checkout, verify, userOrder, allOrder} = require('../controllers/paymentcoontroller')
const authmiddleware = require('../Middleware/usermiddleware')
const router = express.Router()

router.post('/checkout', Checkout)

// verify and save to db
router.post("/verify-payment", verify)

// user order
router.get('/userorder', authmiddleware, userOrder)

// all orders admin
router.get('/allorders', authmiddleware, allOrder)

module.exports = router