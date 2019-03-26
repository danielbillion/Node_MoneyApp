const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validator = require('../middleware/validate');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Outstanding, validate, validRequest} = require('../models/outstanding');

router.get('/',[auth], async function(req,res){
    const Outstanding = await Outstanding.find().sort({'created_at':-1})
    res.send(Outstanding)
})

router.get('/:id',[auth,validateObjectId], async function(req,res){
   
    const Outstanding = await Outstanding.findById(req.params.id)
    
    res.send(Outstanding)
})

router.post('/',[auth,validator(validate)], async function(req,res){
        Outstanding = new Outstanding(validRequest(req.body));
        Outstanding = await Outstanding.save();
        return res.status(200).send(Outstanding);
})



router.put('/:id',[auth, validateObjectId,validator(validate)], async function(req,res){
   
    let Outstanding =  await Outstanding.findByIdAndUpdate(req.params.id,req.body,{new:true})
     if(!Outstanding)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(Outstanding)
})

router.delete('/:id',[auth,admin, validateObjectId], async function(req,res){
   
    let Outstanding =  await Outstanding.findByIdAndDelete(req.params.id)
     if(!Outstanding)return res.status(404).send('id supplied is not in our record')
   
   return res.status(200).send(Outstanding)
})

module.exports = router