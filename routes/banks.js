const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Bank, validate, validRequest} = require('../models/bank');


router.get('/',[auth], async function(req,res){
    const bank = await Bank.find().sort({'created_at':-1,'user_id':1})
    res.send(bank)
})

router.get('/:id',[auth,admin,validateObjectId], async function(req,res){
   
    const bank = await Bank.findById(req.params.id)
    
    res.send(bank)
})

router.post('/',[auth,admin], async function(req,res){
   
     let bank = new Bank(validRequest(req.body))
    bank = await bank.save()
    
    return res.send(bank)
})

router.put('/:id',[auth,admin, validateObjectId,validator(validate)], async function(req,res){
   
    let bank =  await Bank.findByIdAndUpdate(req.params.id,req.body,{new:true})
     if(!bank)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(bank)
})

router.delete('/:id',[auth,admin, validateObjectId], async function(req,res){
   
    let bank =  await Bank.findByIdAndDelete(req.params.id)
     if(!bank)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(bank)
})

module.exports = router