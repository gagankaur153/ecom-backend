const express = require ('express')
const { register, login, getprofile, alluser, logout } = require('../controllers/usercontroller')
const authmiddleware = require('../Middleware/usermiddleware')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/getuser', authmiddleware, getprofile)
router.get('/alluser', alluser)

router.delete('/logout',authmiddleware, logout)

module.exports = router



