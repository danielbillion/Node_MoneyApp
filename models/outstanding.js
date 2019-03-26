const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');


const OutstandingSchema = new mongoose.Schema({
    transaction_id:{
        type:Number,
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
    amount:{
        type:Number,
        minLength:1,
        maxLength:20,
        required:true
    },
    agent_commission:{
        type:Number,
        minLength:1,
        maxLength:20,
        required:true
    },
    manager_id:{
        type:Number,
        minLength:1,
        maxLength:20,
        required:true
    },
    admin_id:{
        type:Number,
        minLength:1,
        maxLength:20,
        required:true
    },
    transaction_paid:{
        type:Number,
        minLength:1,
        maxLength:20,
        required:true
    },
    commission_paid:{
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
// OutstandingSchema.static.findCommission = function(){
//     return findOne({ 'start_from':req.params.amount,
//                     'currency_id':req.params.currency_id,
//                     'user_id':req.params.user_id,
//                     }).sort({'created_at':-1,'user_id':1})
// }
const Outstanding = mongoose.model('Outstanding', OutstandingSchema)



//Validations
const validateOutstanding = function(Outstanding){
    schema = {
        transaction_id:Joi.number().min(1).max(22).required(),
        user_id:Joi.number().min(1).max(22).required(),
        amount:Joi.number().min(1).max(22).required(),
        agent_commission:Joi.number().min(1).max(22).required(),
        agent_commission:Joi.number().min(1).max(22).required(),
        manager_id:Joi.number().min(1).max(22).required(),
        admin_id:Joi.number().min(1).max(22).required(),
        transaction_paid:Joi.number().min(1).max(22).required(),
        commission_paid:Joi.number().min(1).max(22).required(),
    }
    return Joi.validate(Outstanding,schema)
}

const validRequest =  function (request){
    return _.pick(request, ['transaction_id','user_id','amount','agent_commission',
                        'manager_id', 'admin_id', 'transaction_paid','commission_paid'
])
}


exports.validRequest = validRequest
exports.Outstanding = Outstanding;
exports.validate = validateOutstanding