const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/login', UserController.login) //ok
router.post('/register', UserController.register) //ok

module.exports = router