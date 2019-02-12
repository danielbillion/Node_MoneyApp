const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config')
const jwt = require('jsonwebtoken');

const rateSchema = new mongoose.Schema({
    rate:{
        type:Number,
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

rateSchema.statics.lookup = function(rateId) {
    return this.findById(rateId);
  }

const Rate = mongoose.model('Rate', rateSchema)

const validateRate = function(rate){
    schema = {
        rate:Joi.number().required(),
        bou_rate:Joi.number(),
        sold_rate:Joi.number(),
        user_id:Joi.number().required(),
        currency_id:Joi.number().required(),
    }

    return Joi.validate(rate,schema)
}

exports.Rate = Rate;
exports.validate = validateRate