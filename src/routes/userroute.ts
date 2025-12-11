import {Router} from 'express'
import { register, login, getprofile, alluser, logout } from '../controllers/usercontroller'
import {authmiddleware} from '../Middleware/usermiddleware'
const router = Router()

router.post('/register', register)
router.post('/login', login)

router.get('/getuser', authmiddleware, getprofile)
router.get('/alluser', alluser)

router.delete('/logout',authmiddleware, logout)

export default router



