const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');

const PaymentSchema = new mongoose.Schema({
    ref:{
        type:String,
        minLength:1,
        maxLength:20,
        required:true
    },
    amount:{
        type:Number,
        minLength:1,
        maxLength:20,
        required:true
    },
    for:{
        type:String,
        minLength:1,
        maxLength:20,
        required:true
    },
    mode:{
        type:String,
        minLength:1,
        maxLength:20,
        required:true
    },
    user_type:{
        type:String,
        minLength:1,
        maxLength:20,
        required:true
    },
    user_id:{
        type:Number,
        minLength:1,
        maxLength:20,
        required:true
    },
   
    created_at:{
        type:Date,
        default:Date.now
    }
})
// PaymentSchema.static.findCommission = function(){
//     return findOne({ 'start_from':req.params.amount,
//                     'currency_id':req.params.currency_id,
//                     'user_id':req.params.user_id,
//                     }).sort({'created_at':-1,'user_id':1})
// }
const Payment = mongoose.model('Payment', PaymentSchema)

'ref','amount','for','mode','user_type','user_id'

//Validations
const validatePayment= function(Payment){
    schema = {
        ref:Joi.string().min(1).max(22).required(),
        amount:Joi.number().required(),
        for:Joi.string().min(1).max(22).required(),
        mode:Joi.string().min(1).max(22).required(),
        user_type:Joi.string().min(1).max(22).required(),
        user_id:Joi.number().required(),
    
    }
    return Joi.validate(Payment,schema)
}

const validRequest =  function (request){
    return _.pick(request, ['ref','amount','for','mode','user_type','user_id'])
}


exports.validRequest = validRequest
exports.Payment = Payment;
exports.validate = validatePayment