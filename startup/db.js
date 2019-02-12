const winston = require('winston');
const config = require('config')
const mongoose= require('mongoose')

module.exports = function(){
    const db = config.get('db');
    mongoose.connect(db, { useNewUrlParser: true,useCreateIndex: true, })
.then(()=>winston.info(`Connected to ${db}...`))
.catch(err => console.log(`could not connect to mongodb ${db}`))

    
}