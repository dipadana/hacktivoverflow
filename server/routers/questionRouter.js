const router = require('express').Router()
const questionController = require('../controllers/questionController')
const {authentication,authorization} = require('../middleware/auth')

router.get('/', questionController.questionList) //ok
router.get('/detail/:_id', questionController.questionDetail) //ok

router.use(authentication)

router.get('/myquestion', questionController.myQuestion) //ok
router.post('/', questionController.createQuestion)
router.patch('/upvotes/:_id', questionController.updateUpvotes)
router.patch('/downvotes/:_id', questionController.updateDownvotes)

router.delete('/:_id', authorization, questionController.deleteQuestion)
router.put('/:_id', authorization, questionController.editQuestion)


module.exports = router