import { Router } from 'express'
import { getaddress, addaddress, getoneaddress, removeaddress } from '../controllers/addresscontroller'
const router = Router()
import { authmiddleware } from '../Middleware/usermiddleware'

router.post('/add', authmiddleware, addaddress)
router.get('/getaddress', authmiddleware, getaddress)
router.get('/getoneaddress/:addressid', authmiddleware, getoneaddress)

router.delete('/removeaddress/:addressid', authmiddleware, removeaddress)

export default router
