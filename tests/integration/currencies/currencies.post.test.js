const {User} = require('../../../models/user');
const {Rate} = require('../../../models/rate');
const request = require('supertest');
const mongoose = require('mongoose');
// POST api/rates
    // Return 401 if user is not logged in 
    // Return 400 if there is a missing Input property
    // Return 200 if reques is valid
   
describe(' /api/rates', ()=>{
        
    let server;  
    let token;
    let newRate;
    let testData
    
  const exec = () => {
    return request(server)
      .post('/api/rates')
      .set('x-auth-token', token)
      .send(testData);
  };
  
  beforeEach(async () => { 
            server = require('../../../index'); 

            rateId = mongoose.Types.ObjectId();
            token = new User().generateAuthToken();
            
         
            testData = {        _id:rateId,
                                rate:500,
                                sold_rate:0,
                                bou_rate:0,
                                user_id:0 ,
                                currency_id:1
                            };
                         newRate = new Rate(testData);
            await newRate.save();
        })
    
        afterEach(async () => { 
            
            await Rate.deleteMany();
            await server.close(); 
        });  


        describe(' POST Rate', () => {
            it('Should Return 401 if user is not logged in', async () => {

                token = '';
               const res = await exec();
       
               expect(res.status).toBe(401)
           })
       
            it('Should Return 400 if any of post input is missing', async () => {   
                        testData.rate = ""
                       const res = await exec()
                       expect(res.status).toBe(400)
               })  
       
           it('Should Return 200 if have a valid request', async () => {
                   delete testData._id
                   const res = await exec();
                   expect(res.status).toBe(200);
       
           }) 
        })

      
})

