const User = require('../models/user')
const {generateToken} = require('../helpers/jwt')
const {decodeHash} = require('../helpers/bcrypt')

class UserController {

  static login(req,res,next){
    const {email, password} = req.body
    User.findOne({email})
      .then(data => {
        if(data){
          if(decodeHash(password,data.password)){
            const {name, email, _id, tags} = data
            let token = generateToken({name,email,_id,tags})
            res.status(200).json({access_token:token,name,_id,tags})
          }
          else{
            throw { message:'Invalid email or password!',status:400 }
          }
        }
        else{
          throw { message:'Email not registered',status:400 }
        }
      })
      .catch(next)
  }

  static register(req,res,next){
    console.log(req.body)
    const {name,email,password,tags} = req.body
    let dataTemp = tags.split(',')
    let tagFinal = []
    for(let i = 0; i < dataTemp.length; i++){
      tagFinal.push(dataTemp[i].trim())
    }
    User.create({name,email,password,tags:tagFinal})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static editTag (req,res,next) {
    const {tags} = req.body
    const {_id} = req.loggedUser
    let dataTemp = tags.split(',')
    let tagFinal = []
    for(let i = 0; i < dataTemp.length; i++){
      tagFinal.push(dataTemp[i].trim())
    }
    User.updateOne({_id},{tags:tagFinal})
      .then(data => {
        req.status(200).json(data)
      })
      .catch(next)
  }

  static deleteTag (req,res,next) {
    const {tag} = req.params
    const {_id} = req.loggedUser
    User.updateOne({_id},{$pull:{tags:tag}})
      .then(data => {
        req.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = UserController