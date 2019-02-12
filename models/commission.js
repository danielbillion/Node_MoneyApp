const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config')


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

const Commission = mongoose.model('Commission', commissionSchema)

const validateCommission = function(rate){
    schema = {
        start_from:Number().min(1).max(20).required(),
        end_at:Number().min(1).max(20),
        value:Number().min(1).max(20),
        agent_quota:Number().min(1).max(20).required(),
        currency_id:Number().min(1).max(20).required(),
    }

    return Joi.validate(rate,schema)
}

exports.rate = Commission;
exports.validate = validateCommission