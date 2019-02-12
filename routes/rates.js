const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const {Rate, validate} = require('../models/rate');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/',[auth, admin], async function(req,res){
    const rates = await Rate.find().sort('created_at')
    res.send(rates)
})

router.get('/today', async function(req,res){
    const rates = await Rate.find().sort({created_at: -1}).limit(1)
        if(!rates) return res.status(404).send('No Rates')
    res.send(rates)
})

router.post('/',auth, async function(req,res){
   const  {error} = validate(req.body)
     if(error) return res.status(400).send(error.details[0].message)

    let rate = new Rate(_.pick(req.body,['rate','bou_rate','sold_rate','user_id','currency_id']))
    rate = await rate.save()

    return res.status(200).send(rate)
  
})

router.put('/:id', [auth, validateObjectId] , async function(req,res){
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let  rate = await Rate.findById(req.params.id);
        if(!rate) return res.status(404).send('Rate not found')
            
        rate = await Rate.findByIdAndUpdate(req.params.id,req.body ,{new:true})
        if (!rate) return res.status(404).send('The rate with the given ID was not found.');
       
        res.send(rate);
       
      
})

router.delete('/:id', [auth,admin, validateObjectId] , async (req,res) => {
   const rate = await Rate.findOneAndDelete(req.params.id);
    if (!rate) return res.status(404).send('The rate ID given  was not found.');
        
     res.send(rate);
})

module.exports = router