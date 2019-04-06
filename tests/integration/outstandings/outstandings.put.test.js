const {User} = require('../../../models/user');
const {Outstanding} = require('../../../models/outstanding');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('PUT  /api/outstanding', ()=>{
        
    let server;  
    let token;
    let testData
 
    

        const exec = async () => {
            return await request(server)
            .put('/api/outstandings/' + id)
            .set('x-auth-token', token)
            .send(testData);
        };

  
  
         beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
           
            token = new User({isAdmin:true}).generateAuthToken();
            
             testData = 

                {   
                    "_id":id,
                    "transaction_id":"1",
                    "user_id":"1",
                    "amount":"2",
                    "agent_commission":"3",
                    "manager_id":"1",
                    "admin_id":"1",
                    "transaction_paid":"1",
                    "commission_paid":"1" }
                    
                    outstanding = new Outstanding(testData)
                    outstanding.save();
                
                // await Outstanding.collection.insertMany(testData)
            })
    
            afterEach(async () => { 
                    
                    await Outstanding.deleteMany();
                    await server.close(); 
                });  


           describe('PUT /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                    it('Should Return 404 for invalid id type', async () => {  
                        id = "123"
                        const res = await exec();
                        expect(res.status).toBe(404);
                     })
                
                    it('Should Return 400 for empty empty test data', async () => {  
                            testData = {} 
                            const res = await exec();
                            expect(res.status).toBe(400);
                         })
                     
                  it('Should Return 200 for outstanding are stored succesfully', async () => {
                                delete testData._id 
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body))
                                    .toEqual(
                                    expect.arrayContaining(['transaction_id','user_id','amount','agent_commission',
                                    'manager_id', 'admin_id', 'transaction_paid','commission_paid']));
                        })   
                
                     
              })
        })
