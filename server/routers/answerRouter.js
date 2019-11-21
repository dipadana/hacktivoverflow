const router = require('express').Router()
const AnswerController = require('../controllers/answerController')
const {answerAuthorization,authentication} = require('../middleware/auth')

router.use(authentication)
router.get('/myanswer', AnswerController.findMyAnswer)
router.post('/', AnswerController.createAnswer) //ok
router.patch('/upvotes/:_id', AnswerController.updateUpvotes) //ok
router.patch('/downvotes/:_id', AnswerController.updateDownvotes) //ok

//Authorization here

router.put('/:_id', answerAuthorization, AnswerController.editAnswer)
router.delete('/:_id/:QuestionId', answerAuthorization, AnswerController.deleteAnswer)

module.exports = router