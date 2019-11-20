const router = require('express').Router()
const tagController = require('../controllers/tagController')

console.log('masuk tags')
router.get('/', tagController.getAllTag)

module.exports = router