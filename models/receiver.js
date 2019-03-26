const Joi = require('joi');
const _ = require('lodash')
const mongoose = require('mongoose');
const config = require('config')
const jwt = require('jsonwebtoken');


const receiverSchema = new mongoose.Schema({
    user_id:{
        type:Number,
        minLength:1,
        required:true,
        maxLength:20,
    },
    sender_id:{
        type:Number,
        minLength:1,
        required:true,
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
    phone:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    bank:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    transfer_type:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    identity_type:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    account_number:{
        type:String,
        minLength:1,
        maxLength:20,
    },
   created_at:{
        type:Date,
        default:Date.now
    }
})

receiverSchema.statics.lookup = function(receiverId) {
    return this.findById(receiverId);
  }

const Receiver = mongoose.model('receiver', receiverSchema)

const validateReceiver = function(receiver){
    schema =  {
                user_id:Joi.number().required(),
                sender_id:Joi.number().required(),
                fname:Joi.string().required(),
                lname:Joi.string().required(),
                phone:Joi.string().required(),
                bank:Joi.string().required(),
                transfer_type:Joi.string().required(),
                identity_type:Joi.string().required(),
                account_number:Joi.number().required(),
     };

    
   

    return Joi.validate(receiver,schema)
}
const validRequest =  function (request){
    return _.pick(request, [
    	'fname',
    	'lname',
    	'user_id',
    	'sender_id',
    	'phone',
    	'bank',
    	'transfer_type',
    	'identity_type',
    	'account_number',

    ])
}


exports.validRequest = validRequest;
exports.Receiver = Receiver;
exports.validate = validateReceiver;

                           