const {User} = require('../../../models/user');
const {Payment} = require('../../../models/payment');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('PUT  /api/payments', ()=>{
        
    let server;  
    let token;
    let payment
    let testData
 
    

  const exec = async () => {
    return await request(server)
      .put('/api/payments/' + id)
      .set('x-auth-token', token)
      .send(testData);
  };

  
  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
            
            token = new User({isAdmin:true}).generateAuthToken();
            testData =  { 
                            _id:id,
                            ref:'as3444',
                            amount:400,
                            for:'subscription',
                            mode:'cash',
                            user_type:'agent',
                            user_id:2 }
             
            payment = new Payment(testData);
             await payment.save()
        })
    
        afterEach(async () => { 
            
            await Payment.deleteMany();
            await server.close(); 
        });  


           describe('PUT /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                    // it('Should Return 403 if user is admin', async () => {
                    
                    //     token = new User({isAdmin:false}).generateAuthToken();
                            
                    //     const res = await exec();
                
                    //     expect(res.status).toBe(403)
                    // })

                    it('Should Return 404 if id is not valid', async () => {
                    
                        id = 1;
                            
                        const res = await exec();
                
                        expect(res.status).toBe(404)
                    })

                    it('Should Return 400 if inputs are not valid', async () => {
                    
                        testData = {};
                            
                        const res = await exec();
                
                        expect(res.status).toBe(400)
                    })

                  it('Should update with valid id', async () => { 
                                 delete testData._id  
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body))
                                    .toEqual(
                                    expect.arrayContaining(['ref',
                                    'amount',
                                    'for',
                                    'mode',
                                    'user_type',
                                    'user_id']));
                        })   
                
                     
           })

         
    

      
})

