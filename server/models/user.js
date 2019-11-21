const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {generateHash} = require('../helpers/bcrypt')

const userSchema = new Schema({
  name : {
    type:String, 
    required: "Name is required"},
  email : {
    type:String, 
    required: "Email is required",
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password : {
    type :  String,
    required : "Password required"
  },
  tags: {type: [String], required: 'Tag is required'}
}, {timestamps:true,versionKey:false})

userSchema.path('email').validate(function(value) {
  return User.findOne({ email: value })
    .then(user => {
      if(user) return false 
    })
}, 'Email user is already registered!')

userSchema.pre('save', function(next){
  this.password = generateHash(this.password)
  next()
})

const User = mongoose.model("User", userSchema);
module.exports = User