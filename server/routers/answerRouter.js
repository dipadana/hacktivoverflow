const router = require('express').Router()
const AnswerController = require('../controllers/answerController')
const {authorization,authentication} = require('../middleware/auth')

router.use(authentication)
router.get('/myanswer', AnswerController.findMyQuestion)
router.post('/', AnswerController.createAnswer) //ok
router.patch('/upvotes/:_id', AnswerController.updateUpvotes) //ok
router.patch('/downvotes/:_id', AnswerController.updateDownvotes) //ok

//Authorization here

router.put('/:_id', AnswerController.editAnswer)
router.delete('/:_id/:QuestionId', AnswerController.deleteAnswer)

module.exports = router