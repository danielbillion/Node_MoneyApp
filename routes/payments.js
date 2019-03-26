const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Payment, validate, validRequest} = require('../models/payment');

router.get('/',[auth], async function(req,res){
    const payment = await Payment.find().sort({'created_at':-1})
    res.send(payment)
})

router.get('/:id',[auth,validateObjectId], async function(req,res){
   
    const payment = await Payment.findById(req.params.id)
    
    res.send(payment)
})

router.post('/',[auth,validator(validate)], async function(req,res){
    payment = new Payment(validRequest(req.body));
    payment = await payment.save();
        return res.status(200).send(payment);
})



router.put('/:id',[auth, validateObjectId,validator(validate)], async function(req,res){
   
    let payment =  await Payment.findByIdAndUpdate(req.params.id,req.body,{new:true})
     if(!payment)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(payment)
})

router.delete('/:id',[auth,admin, validateObjectId], async function(req,res){
   
    let payment =  await Payment.findByIdAndDelete(req.params.id)
     if(!payment)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(Payment)
})

module.exports = router