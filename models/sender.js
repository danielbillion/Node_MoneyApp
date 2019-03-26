const Joi = require('joi');
const _ = require('lodash')
const mongoose = require('mongoose');
const config = require('config')
const jwt = require('jsonwebtoken');


const senderSchema = new mongoose.Schema({
    user_id:{
        type:Number,
        minLength:1,
        required:true,
        maxLength:20,
    },
    title:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    fname:{
        type:String,
        minLength:1,
        required:true,
        maxLength:20,
    },
    lname:{
        type:String,
        minLength:1,
        maxLength:20,
        required:true,
    },
    mname:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    name:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    email:{
        type:String,
        minLength:1,
        maxLength:20,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    phone:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    dob:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    address:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    postcode:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    currency_id:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    address_id:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    photo_id:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

senderSchema.statics.lookup = function(senderId) {
    return this.findById(senderId);
  }

  senderSchema.statics.autocomplete = function(sender) {
     regex = new RegExp(".*" + sender + ".*", "g");
    return this.find( { fname: regex }   || { lname: regex } )
              
  }

const Sender = mongoose.model('sender', senderSchema)

const validateSender = function(sender){
    schema =  {
                user_id:Joi.number().required(),
                fname:Joi.string().required(),
                lname:Joi.string().required(),
                mname:Joi.string().required(),
                name:Joi.string().required(),
                email:Joi.string().required(),
                mobile:Joi.string().required(),
                phone:Joi.string().required(),
                dob:Joi.string().required(),
                address:Joi.string().required(),
                postcode:Joi.string().required(),
                title:Joi.string().required(),
                currency_id:Joi.number().required(),
                address_id:Joi.number().required(),
                photo_id:Joi.number().required()
    };

    
   

    return Joi.validate(sender,schema)
}
const validRequest =  function (request){
    return _.pick(request, ['user_id','fname','lname',
                            'mname','name','email','mobile','phone',
                            'dob','address','postcode','title','currency_id',
                            'address_id','photo_id'
                            ])
}


exports.validRequest = validRequest;
exports.Sender = Sender;
exports.validate = validateSender;

                           