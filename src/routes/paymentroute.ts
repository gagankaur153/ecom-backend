import {Router} from 'express'
import {Checkout, verify, userOrder, allOrder} from '../controllers/paymentcoontroller'
import {authmiddleware} from '../Middleware/usermiddleware'
const router = Router()

router.post('/checkout', Checkout)

// verify and save to db
router.post("/verify-payment", verify)

// user order
router.get('/userorder', authmiddleware, userOrder)

// all orders admin
router.get('/allorders', authmiddleware, allOrder)

export default router