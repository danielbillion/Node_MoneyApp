
;
const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const rates = require('../routes/rates');
const currencies = require('../routes/currencies');


module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/rates', rates);
    app.use('/api/currencies', currencies);
    app.use('/api/auth', auth)
    app.use('/api/auth', function(req,res){
            console.log('connected to port')
    })
}



