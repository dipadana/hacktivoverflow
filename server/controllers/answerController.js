const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
  
  static findMyAnswer(req,res,next){
    const {_id} = req.loggedUser // Need a question id for get question answer
    Answer.find({UserId:_id}).populate('QuestionId')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static createAnswer(req,res,next){
    const {QuestionId, description} = req.body
    const UserId = req.loggedUser._id
    Answer.create({QuestionId,description,UserId})
      .then(data => {
        return Question.update({_id:QuestionId},{$push:{AnswerId:data._id}})
      })
      .then(data => {
        res.status(200).json({message:'Add answer success',data})
      })
      .catch(next)
  }

  static deleteAnswer(req,res,next){
    const {_id,QuestionId} = req.params // Need a answer id for delete the answer
    Answer.deleteOne({_id})
      .then(data => {
        return Question.updateOne({_id:QuestionId},{$pull:{AnswerId:_id}})
      })
      .then(data => {
        if(data.nModified !== 0){
          res.status(200).json({message:'Delete data success',data})
        }
        else{
          res.status(404).json({message:'Data not found',data})
        }
      })
      .catch(next)
  }

  static editAnswer(req,res,next){
    const {_id} = req.params // Need a answer id for update
    const {description} = req.body
    Answer.updateOne({_id},{description})
      .then(data => {
        if(data.n != 0){
          res.status(200).json({message:'Edit answer success!',data})
        }
        else{
          res.status(404).json({message:'No data found!',data})
        }
      })
      .catch(next)
  }

  static updateUpvotes(req,res,next){
    const {_id} = req.params // Need a answer id for update upvotes
    const UserId = req.loggedUser._id
    let messageStatus
    Answer.findOne({_id})
      .then(data => {
        if(data){
          for(let i = 0; i < data.upvotes.length; i++){
            if(data.upvotes[i] == UserId){
              messageStatus = 'Upvotes canceled'
              return Answer.updateOne({_id},{$pull:{upvotes:UserId}})
            }
          }
          for(let i = 0; i < data.downvotes.length; i++){
            if(data.downvotes[i] == UserId){
              messageStatus = 'Upvotes success, delete downvotes'
              return Promise.all([
                Answer.updateOne({_id},{$pull:{downvotes:UserId}}),
                Answer.updateOne({_id},{$push:{upvotes:UserId}})
              ])
            }
          }
          messageStatus = 'Upvotes success'
          return Answer.updateOne({_id},{$push:{upvotes:UserId}})
        }
        else{
          return res.status(404).json({msg:"Answer not found"})
        }
      })
      .then(data => {
        res.status(200).json({message:messageStatus,data})
      })
      .catch(next)
  }

  static updateDownvotes(req,res,next){
    const {_id} = req.params // Need a answer id for update upvotes
    const UserId = req.loggedUser._id
    let messageStatus
    Answer.findOne({_id})
      .then(data => {
        if(data){
          for(let i = 0; i < data.downvotes.length; i++){
            if(data.downvotes[i] == UserId){
              messageStatus = 'Downvotes canceled'
              return Answer.updateOne({_id},{$pull:{downvotes:UserId}})
            }
          }
          for(let i = 0; i < data.upvotes.length; i++){
            if(data.upvotes[i] == UserId){
              messageStatus = 'Downvotes success, delete upvotes'
              return Promise.all([
                Answer.updateOne({_id},{$pull:{upvotes:UserId}}),
                Answer.updateOne({_id},{$push:{downvotes:UserId}})
              ])
            }
          }
          messageStatus = 'Downvotes success'
          return Answer.updateOne({_id},{$push:{downvotes:UserId}})
        }
        else{
          return res.status(404).json({msg:"Answer not found"})
        }
      })
      .then(data => {
        res.status(200).json({message:messageStatus,data})
      })
      .catch(next)
  }
}

module.exports = AnswerController