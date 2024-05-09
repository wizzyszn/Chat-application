const express  = require('express')
const { userRegister, loginUser, findUser, getUsers } = require('../controllers/userController')
const router = express.Router()

router.post('/register',userRegister)
router.post('/login',loginUser)
router.get('/find/:userId',findUser)
router.get('/:userId',getUsers)
module.exports = router;