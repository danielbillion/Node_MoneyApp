const Joi = require('joi');
const _ = require('lodash')
const mongoose = require('mongoose');
const config = require('config')
const jwt = require('jsonwebtoken');


const transactionSchema = new mongoose.Schema({
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
    receiver_id:{
        type:Number,
        minLength:1,
        required:true,
        maxLength:20,
    },
    receipt_number:{
        type:String,
        minLength:1,
        required:true,
        maxLength:20,
    },
    receiver_phone:{
        type:String,
        minLength:1,
        maxLength:20,
        required:true,
    },
    type:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    amount:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    commission:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    agent_commission:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    exchange_rate:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    currency_id:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    currency_income:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    bou_rate:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    sold_rate:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    status:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    note:{
        type:String,
        minLength:1,
        maxLength:20,
    },
   created_at:{
        type:Date,
        default:Date.now
    }
})

transactionSchema.statics.lookup = function(transactionId) {
    return this.findById(transactionId);
  }

const Transaction = mongoose.model('transaction', transactionSchema)

const validateTransaction = function(transaction){
    schema =  {
                user_id:Joi.number().required(),
                sender_id:Joi.number().required(),
                receiver_id:Joi.number().required(),
                receipt_number:Joi.string().required(),
                receiver_phone:Joi.string().required(),
                type:Joi.string().required(),
                amount:Joi.number().required(),
                commission:Joi.number().required(),
                agent_commission:Joi.number().required(),
                exchange_rate:Joi.number().required(),
                currency_id:Joi.number().required(),
                currency_income:Joi.string().required(),
                bou_rate:Joi.number().required(),
                sold_rate:Joi.number().required(),
                status:Joi.string().required(),
                note:Joi.string().required(),
     };

    
   

    return Joi.validate(transaction,schema)
}
const validRequest =  function (request){
    return _.pick(request, [
        'receipt_number',
        'receiver_phone',
        'type',
        'user_id',
        'sender_id',
        'receiver_id',
        'amount',
        'commission',
        'agent_commission',
        'exchange_rate',
        'currency_id',
        'currency_income',
        'bou_rate',
        'sold_rate',
        'note',
        'status'
            ])
}


exports.validRequest = validRequest;
exports.Transaction = Transaction;
exports.validate = validateTransaction;

                           