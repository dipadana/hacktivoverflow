const Question = require('../models/question')
const Answer = require('../models/answer')

class QuestionController {

  static questionList(req,res,next){
    Question.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static questionDetail(req,res,next){
    const {_id} = req.params //Id question, for question page
    Question.findOne({_id})
    .populate('AnswerId')
    .populate('UserId')
    .populate({path:'AnswerId', populate:{path:'UserId'}})
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          throw { message:'Question not found',status:404 }
        }
      })
      .catch(next)
  }

  static questionByTag(req,res,next) {
    const {tag} = req.params
    Question.find({tags:tag}).sort({createdAt: -1})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static async questionBySearchKey(req,res,next) {
    const {searchKey} = req.params
    let filterRegex = new RegExp(searchKey, 'gi')
    try{
      const data = await Question.find({title : {$regex : filterRegex}})
      res.status(200).json(data)
    }
    catch(err){
      next(err)
    }
  }

  static myQuestion(req,res,next){
    const {_id} = req.loggedUser
    Question.find({UserId:_id})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static editQuestion(req,res,next){
    const {_id} = req.params //question id
    const {description, title, tags} = req.body
    let dataTemp = tags.split(',')
    let tagFinal = []
    for(let i = 0; i < dataTemp.length; i++){
      tagFinal.push(dataTemp[i].trim())
    }
    Question.updateOne({_id},{description,title,tags:tagFinal})
      .then(data => {
        res.status(200).json({ message:'Update question success!',data })
      })
      .catch(next)
  }

  static updateUpvotes(req,res,next){
    const {_id} = req.params // Need a question id for update upvotes
    const UserId = req.loggedUser._id
    let messageStatus
    Question.findOne({_id})
      .then(data => {
        if(data){
          for(let i = 0; i < data.upvotes.length; i++){
            if(data.upvotes[i] == UserId){
              messageStatus = 'Upvotes canceled'
              return Question.updateOne({_id},{$pull:{upvotes:UserId}})
            }
          }
          for(let i = 0; i < data.downvotes.length; i++){
            if(data.downvotes[i] == UserId){
              messageStatus = 'Upvotes success, delete downvotes'
              return Promise.all([
                Question.updateOne({_id},{$pull:{downvotes:UserId}}),
                Question.updateOne({_id},{$push:{upvotes:UserId}})
              ])
            }
          }
          messageStatus = 'Upvotes success'
          return Question.updateOne({_id},{$push:{upvotes:UserId}})
        }
        else{
          return res.status(404).json({msg:"Question not found"})
        }
      })
      .then(data => {
        res.status(200).json({ message:messageStatus,data })
      })
      .catch(next)
  }

  static updateDownvotes(req,res,next){
    const {_id} = req.params // Need a question id for update upvotes
    const UserId = req.loggedUser._id
    let messageStatus
    Question.findOne({_id})
      .then(data => {
        if(data){
          for(let i = 0; i < data.downvotes.length; i++){
            if(data.downvotes[i] == UserId){
              messageStatus = 'Downvotes canceled'
              return Question.updateOne({_id},{$pull:{downvotes:UserId}})
            }
          }
          for(let i = 0; i < data.upvotes.length; i++){
            if(data.upvotes[i] == UserId){
              messageStatus = 'Downvotes success, delete upvotes'
              return Promise.all([
                Question.updateOne({_id},{$pull:{upvotes:UserId}}),
                Question.updateOne({_id},{$push:{downvotes:UserId}})
              ])
            }
          }
          messageStatus = 'Downvotes success'
          return Question.updateOne({_id},{$push:{downvotes:UserId}})
        }
        else{
          return res.status(404).json({msg:"Question not found"})
        }
      })
      .then(data => {
        res.status(200).json({ message:messageStatus,data })
      })
      .catch(next)
  }

  static createQuestion(req,res,next){
    const {_id} = req.loggedUser
    const {title,description,tags} = req.body
    let dataTemp = tags.split(',')
    let tagFinal = []
    for(let i = 0; i < dataTemp.length; i++){
      tagFinal.push(dataTemp[i].trim())
    }
    Question.create({title,description,UserId:_id,tags:tagFinal})
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch(next)
  }

  static deleteQuestion(req,res,next){
    const {_id} = req.params //question id
    Question.deleteOne({_id})
      .then(data => {
        return Answer.deleteMany({QuestionId:_id})
      })
      .then(data => {
        res.status(200).json({ message:'Success delete data!',data })
      })
      .catch(next)
  }
}

module.exports = QuestionController