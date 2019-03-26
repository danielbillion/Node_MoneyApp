const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config')
const _ = require('lodash');


const commissionSchema = new mongoose.Schema({
    start_from:{
        type:Number,
        minLength:1,
        maxLength:20,
        required:true
    },
    end_at:{
        type:Number,
        minLength:1,
        maxLength:20,
        required:true
    },
    value:{
        type:Number,
        minLength:1,
        maxLength:20,
        required:true
    },
    agent_quota:{
        type:Number,
        minLength:1,
        maxLength:20,
        required:true
    },
    user_id:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    currency_id:{
        type:Number,
        minLength:1,
        maxLength:20,
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
commissionSchema.static.findCommission = function(){
    return findOne({ 'start_from':req.params.amount,
                    'currency_id':req.params.currency_id,
                    'user_id':req.params.user_id,
                    }).sort({'created_at':-1,'user_id':1})
}
const Commission = mongoose.model('Commission', commissionSchema)



//Validate
const validateCommission = function(commission){
    schema = {
        start_from:Joi.number().required(),
        end_at:Joi.number(),
        value:Joi.number(),
        agent_quota:Joi.number().required(),
        currency_id:Joi.number().required(),
        user_id:Joi.number().required(),
    }
    

    return Joi.validate(commission,schema)
}

const validRequest =  function (request){
    return _.pick(request, 
                    ['start_from','end_at','value',
                     'agent_quota','currency_id',
                        'user_id'])
}
exports.validRequest = validRequest
exports.Commission = Commission;
exports.validate = validateCommission