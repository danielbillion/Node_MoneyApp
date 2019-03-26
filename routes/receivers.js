const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Receiver, validate, validRequest} = require('../models/receiver');


router.get('/',[auth], async function(req,res){
    const receiver = await Receiver.find().sort({'created_at':-1})
    res.send(receiver)
})

router.get('/:id',[auth,validateObjectId], async function(req,res){
   
    const receiver = await Receiver.findById(req.params.id)
    
    res.send(receiver)
})

router.post('/',[auth,validator(validate)], async function(req,res){
        receiver = new Receiver(validRequest(req.body));
        receiver = await receiver.save();
        return res.send(receiver);
})



router.put('/:id',[auth, validateObjectId,validator(validate)], async function(req,res){
   
    let receiver =  await Receiver.findByIdAndUpdate(req.params.id,req.body,{new:true})
     if(!receiver)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(receiver)
})

router.delete('/:id',[auth,admin,validateObjectId], async function(req,res){
   
    let receiver =  await Receiver.findByIdAndDelete(req.params.id)
     if(!receiver)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(receiver)
})

module.exports = router