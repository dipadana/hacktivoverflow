const router = require('express').Router()
const questionController = require('../controllers/questionController')
const {authentication,questionAuthorization} = require('../middleware/auth')

router.get('/', questionController.questionList) //ok
router.get('/detail/:_id', questionController.questionDetail) //ok
router.get('/searchtag/:tag', questionController.questionByTag)
router.get('/searchtitle/:searchKey', questionController.questionBySearchKey)

router.use(authentication)

router.get('/myquestion', questionController.myQuestion) //ok
router.post('/', questionController.createQuestion) //ok
router.patch('/upvotes/:_id', questionController.updateUpvotes) //ok
router.patch('/downvotes/:_id', questionController.updateDownvotes) //ok

router.put('/:_id', questionAuthorization, questionController.editQuestion) //ok
router.delete('/:_id', questionAuthorization, questionController.deleteQuestion) //ok

module.exports = router
