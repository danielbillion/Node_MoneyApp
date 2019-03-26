const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config')
const _ = require('lodash');


const bankSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:1,
        maxLength:20,
        required:true
    },
    status:{
        type:String,
        minLength:1,
        maxLength:20,
        required:true
    },
    
    created_at:{
        type:Date,
        default:Date.now
    }
})
// bankSchema.static.findCommission = function(){
//     return findOne({ 'start_from':req.params.amount,
//                     'currency_id':req.params.currency_id,
//                     'user_id':req.params.user_id,
//                     }).sort({'created_at':-1,'user_id':1})
// }
const Bank = mongoose.model('bank', bankSchema)



//Validations
const validateBank = function(bank){
    schema = {
        name:Joi.string().min(1).max(22).required(),
        status:Joi.string().min(1).max(22).required(),
    }
    

    return Joi.validate(bank,schema)
}

const validRequest =  function (request){
    return _.pick(request, ['name','status'])
}


exports.validRequest = validRequest
exports.Bank = Bank;
exports.validate = validateBank