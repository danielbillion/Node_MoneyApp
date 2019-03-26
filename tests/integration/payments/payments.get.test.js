const {User} = require('../../../models/user');
const {Payment} = require('../../../models/payment');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('GET  /api/payments', ()=>{
        
    let server;  
    let token;
    let testData
 
    

  const exec = async () => {
    return await request(server)
      .get('/api/payments/')
      .set('x-auth-token', token)
      .send();
  };

  const execOne = async () => {
    return await request(server)
      .get('/api/payments/' + id)
      .set('x-auth-token', token)
      .send();
  };

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
           
            token = new User({isAdmin:true}).generateAuthToken();
            
           
            const payments = [
                    { 
                        ref:'as455',
                        amount:400,
                        for:'subscription',
                        mode:'cash',
                        user_type:'agent',
                        user_id:1
                    },
                    { 
                        ref:'as455',
                        amount:200,
                        for:'subscription',
                        mode:'online',
                        user_type:'agent',
                        user_id:2
                    }
                ]
            
                await Payment.collection.insertMany(payments)
        })
    
        afterEach(async () => { 
            
            await Payment.deleteMany();
            await server.close(); 
        });  


           describe('GET /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                  it('Should Return 200 for payment are available', async () => {   
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body[0]))
                                    .toEqual(
                                    expect.arrayContaining(['ref',
                                            'amount',
                                            'for',
                                            'mode',
                                            'user_type',
                                            'user_id']));
                        })   
                
                     
           })

           describe('GET  api/:id',  async () => {

            it('Should Return 401 if user is not logged in', async () => {
                    
                token = '';
                    
                const res = await exec();
        
                expect(res.status).toBe(401);
            })

          
             it('Should  Return 404 if id is invalid', async () => {
                    id = 1;
                     const res = await execOne(); 
                     expect(res.status).toBe(404);
                      
                })

           

            it('Should Return payment if id is valid', async () => {

                        const res = await exec()
                        expect(res.status).toBe(200)
                    })
        
        
    
    
     })
    

      
})

