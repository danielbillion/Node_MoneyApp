const {User} = require('../../../models/user');
const {Outstanding} = require('../../../models/outstanding');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('DELETE  /api/outstanding', ()=>{
        
    let server;  
    let token;
    let testData
 
    

        const exec = async () => {
            return await request(server)
            .delete('/api/outstandings/' + id)
            .set('x-auth-token', token)
            .send();
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


           describe('Delete /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                    it('Should Return 403 unauthorise acces', async () => {  
                        token = new User({isAdmin:false}).generateAuthToken()
                        const res = await exec();
                        expect(res.status).toBe(403);
                     })

                    it('Should Return 404 for invalid id type', async () => {  
                        id = "123"
                        const res = await exec();
                        expect(res.status).toBe(404);
                     })
                
                    
                     
                  it('Should Return 200 deleted succesfully', async () => {
                             
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
