const {decodeToken} = require('../helpers/jwt')
const Question = require('../models/question')
const Answer = require('../models/answer')

function authentication (req,res,next) {
  if(req.headers.authorization){
    let token = req.headers.authorization
    req.loggedUser = decodeToken(token)
    next()
  }
  else{
    res.status(401).json({ message:'Invalid Authentication' })
  }
}

function questionAuthorization (req,res,next) {
  const { _id } = req.params // Question Id
  Question.findOne({_id})
    .then(data => {
      if(data.UserId == req.loggedUser._id){
        next()
      }
      else{
        res.status(403).json({ message:'Invalid Authorization' })
      }
    })
    .catch(next)
}

function answerAuthorization (req,res,next) {
  const { _id } = req.params // AnswerId
  Answer.findOne({_id})
    .then(data => {
      if(data.UserId == req.loggedUser._id){
        next()
      }
      else{
        res.status(403).json({ message:'Invalid Authorization' })
      }
    })
    .catch(next)
}

module.exports = {
  authentication,questionAuthorization, answerAuthorization
}