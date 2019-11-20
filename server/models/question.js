const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionShema = new Schema({
  title: {
    type : String,
    required: "Title Required"
  },
  description: {
    type: String,
    required: 'Description Required'
  },
  upvotes: [Schema.Types.ObjectId],
  downvotes: [Schema.Types.ObjectId],
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  AnswerId: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  tags: {type: [String], required: 'Tag is required'}
})

const Question = mongoose.model('Question', questionShema)
module.exports = Question