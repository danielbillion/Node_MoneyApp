const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Transaction, validate, validRequest} = require('../models/transaction');

//agentTransaction
//customerTransaction
//createOutstanding
//turnover
//transaction_seeting
router.get('/',[auth], async function(req,res){
    const transaction = await Transaction.find().sort({'created_at':-1})
    res.send(transaction)
})

router.get('/:id',[auth,validateObjectId], async function(req,res){
   
    const transaction = await Transaction.findById(req.params.id)
    
    res.send(transaction)
})

router.post('/',[auth,validator(validate)], async function(req,res){
        transaction = new Transaction(validRequest(req.body));
        transaction = await transaction.save();
        return res.status(200).send(transaction);
})



router.put('/:id',[auth, validateObjectId,validator(validate)], async function(req,res){
   
    let transaction =  await Transaction.findByIdAndUpdate(req.params.id,req.body,{new:true})
     if(!transaction)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(transaction)
})

router.delete('/:id',[auth,admin, validateObjectId], async function(req,res){
   
    let transaction =  await Transaction.findByIdAndDelete(req.params.id)
     if(!transaction)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(transaction)
})

module.exports = router