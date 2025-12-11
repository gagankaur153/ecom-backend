import {Router} from 'express'
import { addcart, allcart, quantitydecrease, deletecart, quantityincrease, updateAllProduct } from '../controllers/cartcontroller'
import{ authmiddleware} from '../Middleware/usermiddleware'
const router = Router()

router.post('/addcart/:productid', authmiddleware, addcart)

router.get('/allcart', authmiddleware, allcart)

router.put('/decrease/:productid', authmiddleware, quantitydecrease)

router.put('/increase/:productid', authmiddleware, quantityincrease)

router.put('/removecart/:productid', authmiddleware, deletecart)

router.put('/deletecart', authmiddleware, updateAllProduct)



export default router