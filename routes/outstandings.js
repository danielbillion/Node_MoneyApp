const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Outstanding, validate, validRequest} = require('../models/outstanding');

router.get('/',[auth], async function(req,res){
    const outstanding = await Outstanding.find().sort({'created_at':-1})
    res.send(outstanding)
})

router.get('/:id',[auth,validateObjectId], async function(req,res){
   
    const outstanding = await Outstanding.findById(req.params.id)
    
    res.send(outstanding)
})

router.post('/',[auth,validator(validate)], async function(req,res){
        outstanding = new Outstanding(validRequest(req.body));
        outstanding = await outstanding.save();
        return res.status(200).send(outstanding);
})



router.put('/:id',[auth, validateObjectId,validator(validate)], async function(req,res){
   
    let outstanding =  await Outstanding.findByIdAndUpdate(req.params.id,req.body,{new:true})
     if(!outstanding)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(outstanding)
})

router.delete('/:id',[auth,admin, validateObjectId], async function(req,res){
   
    let outstanding =  await Outstanding.findByIdAndDelete(req.params.id)
     if(!outstanding)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(outstanding)
})

module.exports = router