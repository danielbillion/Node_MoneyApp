const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    title:{
        type:String,
        minLength:2,
        maxLength:20,
    },
    fname:{
        type:String,
        minLength:2,
        maxLength:20
    },
    lname:{
        type:String,
        minLength:2,
        maxLength:20
    },
    name:{
        type:String,
        minLength:2,
        maxLength:20,
        required:true
    },
    email:{
        type:String,
        required:true,
        minLength:2,
        maxLength:20,
        unique:true 
    },
    password:{
        type:String,
        minLength:2,
        maxLength:20,
        required:true 
    },
    phone:{
        type:Number,
        minLength:2,
        maxLength:20,
    },
    mobile:{
        type:Number,
        minLength:2,
        maxLength:20,
    },
    dob:{
        type:String,
        minLength:2,
        maxLength:20,
    },
    type:{
        type:String,
        minLength:2,
        maxLength:20,
        default:'customer' 
    },
    isAdmin: Boolean,
    created_at:{
        type:Date,
        default:Date.now
    }
})
userSchema.methods.generateAuthToken =function(){
    return  jwt.sign({ _id: this._id, isAdmin: this.isAdmin },config.get('jwtPrivateKey'))
}
const User = mongoose.model('user', userSchema)

function validateUser (user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user,schema);
}


exports.User = User
exports.validate = validateUser
