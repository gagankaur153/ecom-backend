const express= require ('express')
const { getaddress, addaddress, getoneaddress, removeaddress} = require('../controllers/addresscontroller')
const router = express.Router()
const authmiddleware = require('../Middleware/usermiddleware')

router.post('/add', authmiddleware, addaddress )
router.get('/getaddress', authmiddleware,  getaddress)
router.get('/getoneaddress/:addressid', authmiddleware, getoneaddress)

router.delete('/removeaddress/:addressid', authmiddleware, removeaddress)

module.exports = router
