const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Sender, validate, validRequest} = require('../models/sender');


router.get('/',[auth], async function(req,res){
    const sender = await Sender.find().sort({'created_at':-1})
    res.send(sender)
})

router.get('/autocomplete',[auth], async function(req,res){
    const sender = await Sender.autocomplete(req.body.sender).sort({'created_at':-1})
    res.send(sender)
})

router.get('/:id',[auth,validateObjectId], async function(req,res){
   
    const sender = await Sender.findById(req.params.id)
    
    res.send(sender)
})



router.post('/',[auth,validator(validate)], async function(req,res){
        sender = new Sender(validRequest(req.body));
        sender = await sender.save();
        return res.send(sender);
})



router.put('/:id',[auth, validateObjectId,validator(validate)], async function(req,res){
   
    let sender =  await Sender.findByIdAndUpdate(req.params.id,req.body,{new:true})
     if(!sender)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(sender)
})

router.delete('/:id',[auth,admin], async function(req,res){
   
    let sender =  await Sender.findByIdAndDelete(req.params.id)
     if(!sender)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(sender)
})

module.exports = router