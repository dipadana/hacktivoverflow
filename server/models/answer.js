const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  description: {
    type: String,
    required: 'Description required'
  },
  upvotes: [Schema.Types.ObjectId],
  downvotes: [Schema.Types.ObjectId],
  QuestionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer