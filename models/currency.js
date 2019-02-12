const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config')
const jwt = require('jsonwebtoken');

const currencySchema = new mongoose.Schema({
    user_id:{
        type:Number,
        minLength:1,
      },
    origin:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    origin_symbol:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    destination:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    destination_symbol:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    code:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    income_category:{
        type:String,
        minLength:1,
        maxLength:20,
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

currencySchema.statics.lookup = function(currencyId) {
    return this.findById(currencyId);
  }

const Currency = mongoose.model('Currency', currencySchema)

const validateCurrency = function(rate){
    
    schema = {
        user_id:Joi.number().required(),
        origin:Joi.string(),
        origin_symbol:Joi.string(),
        destination:Joi.string().required(),
        destination_symbol:Joi.string().required(),
        code:Joi.string().required(),
        income_category:Joi.string().required(),
    }

    return Joi.validate(rate,schema)
}

exports.Currency = Currency;
exports.validate = validateCurrency