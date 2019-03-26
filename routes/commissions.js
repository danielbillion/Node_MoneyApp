const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Commission, validate, validRequest} = require('../models/commission');


router.get('/',[auth, admin], async function(req,res){
    const commission = await Commission.find().sort({'created_at':-1,'user_id':1})
    res.send(commission)
})

router.get('/:amount /:currency_id /:user_id',[auth], async function(req,res){
    if(!req.params.amount || !req.params.currency_id || !req.params.user_id ) return res.status(400).send('missing parameter');
    const commission = await Commission.findCommission(req.params.amount,req.params.currency_id,req.params.user_id)
    
    res.send(commission)
})

router.post('/',[auth,admin,validator(validate)], async function(req,res){
   
     let commission = new Commission(validRequest(req.body))
    commission = await commission.save()
    
    return res.send(commission)
})

router.put('/:id',[auth,admin, validateObjectId,validator(validate)], async function(req,res){
   
    let commission =  await Commission.findByIdAndUpdate(req.params.id,req.body,{new:true})
     if(!commission)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(commission)
})

router.delete('/:id',[auth,admin, validateObjectId], async function(req,res){
   
    let commission =  await Commission.findByIdAndDelete(req.params.id)
     if(!commission)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(commission)
})

module.exports = router