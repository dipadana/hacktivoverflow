const router = require('express').Router()
const tagController = require('../controllers/tagController')

router.get('/', tagController.getAllTag)

module.exports = router