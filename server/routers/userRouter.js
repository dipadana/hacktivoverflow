const router = require('express').Router()
const UserController = require('../controllers/userController')
const {authentication} = require('../middleware/auth')

router.post('/login', UserController.login) //ok
router.post('/register', UserController.register) //ok
router.get('/tags', authentication, UserController.getMyTag)
router.patch('/addtag', authentication,UserController.editTag)
router.delete('/', authentication,UserController.deleteTag)

module.exports = router