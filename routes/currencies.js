const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
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

router.get('/today', [auth, validateObjectId], async function(req,res){
    const currency = await Currency.findById(req.params.id)
        if(!currency) return res.status(404).send('No Rates')
    res.send(currency)
})


module.exports = router