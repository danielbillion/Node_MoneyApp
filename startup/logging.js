const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const { createLogger, transports } = require('winston');



module.exports = function() {
    const { createLogger, transports } = require('winston');

// Enable exception handling when you create your logger.
const logger = winston.createLogger({
        transports: [
            new transports.File({ filename: 'combined.log' }) ,
            new winston.transports.Console({ colorize: true, prettyPrint:true })  
        ],
        exceptionHandlers: [
            new winston.transports.Console({ colorize: true, prettyPrint:true }),
            new transports.File({ filename: 'exceptions.log' })
        ]
});

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });



  logger.exitOnError = false;

  winston.add(new winston.transports.File({
    filename: 'path/to/combined.log',
    handleExceptions: true
  }));

 
 
   
}







 
//   winston.exceptions.handle(
// 	new winston.transports.Console({ colorize: true, prettyPrint:true }),
//     new winston.transports.File({ filename: 'uncaughtExceptions.log' })
//     );
  
//   process.on('unhandledRejection', (ex) => {
//     throw ex;
//   });
  
//   winston.add(winston.transports.File, { filename: 'logfile.log' });
//   winston.add(winston.transports.MongoDB, { 
//     db: 'mongodb://localhost/vidly',
//     level: 'info'
//   }); 

