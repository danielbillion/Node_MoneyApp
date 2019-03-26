
;
const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const rates = require('../routes/rates');
const currencies = require('../routes/currencies');
const commissions = require('../routes/commissions');
const senders = require('../routes/senders');
const receivers = require('../routes/receivers');
const banks = require('../routes/banks');
const transactions = require('../routes/transactions');
const payments = require('../routes/payments');
const outstandings = require('../routes/outstandings');


module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/rates', rates);
    app.use('/api/currencies', currencies);
    app.use('/api/commissions', commissions);
    app.use('/api/banks', banks);
    app.use('/api/auth', auth)
    app.use('/api/senders', senders)
    app.use('/api/receivers', receivers)
    app.use('/api/transactions', transactions)
    app.use('/api/payments', payments)
    app.use('/api/outstandings', outstandings)
    app.use('/api/auth', function(req,res){
            console.log('connected to port')
    })
}



