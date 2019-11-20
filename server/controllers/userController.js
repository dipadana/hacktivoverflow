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
            const {name, email, _id} = data
            let token = generateToken({name,email,_id})
            res.status(200).json({access_token:token,name,_id})
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
    const {name,email,password} = req.body
    User.create({name,email,password})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = UserController