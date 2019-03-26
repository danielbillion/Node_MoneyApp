const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const admin = require('../middleware/admin');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const {Currency, validate} = require('../models/currency');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/',[auth, admin], async function(req,res){
    const currencies = await Currency.find().sort('created_at')
    res.send(currencies)
})

router.get('/:id', [auth, validateObjectId], async function(req,res){
    const currency = await Currency.findById(req.params.id)
        if(!currency) return res.status(404).send('No Rates')
    res.send(currency)
})

router.post('/', [auth, admin,validator(validate)], async function(req,res){
        
        let currency = await new Currency(_.pick(req.body,
            ['user_id','origin','origin_symbol','destination','destination_symbol','code','income_category']))
          currency.save()
        return res.send(currency)
})

router.put('/:id', [auth, admin,validateObjectId,validator(validate)], async function(req,res){
        
    currency = await Currency.findByIdAndUpdate(req.params.id,req.body,{new:true})
      
    if(!currency) return res.status(404).send('id requested not')
    return res.send(currency)
})

router.delete('/:id', [auth, admin,validateObjectId], async function(req,res){
        
    currency = await Currency.findByIdAndDelete(req.params.id)
      
    if(!currency) return res.status(404).send('id requested not')
    return res.send(currency)
})


module.exports = router