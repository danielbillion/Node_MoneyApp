const {User} = require('../../../models/user');
const {Outstanding} = require('../../../models/outstanding');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('GET  /api/outstanding', ()=>{
        
    let server;  
    let token;
   
    let testData
 
    

  const exec = async () => {
    return await request(server)
      .get('/api/outstandings/')
      .set('x-auth-token', token)
      .send();
  };

  const execOne = async () => {
    return await request(server)
      .get('/api/outstandings/' + id)
      .set('x-auth-token', token)
      .send();
  };

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
           
            token = new User({isAdmin:true}).generateAuthToken();
            
           
            const outstanding = [
                { 
                    transaction_id:1,
                    user_id:1,
                    amount:340,
                    agent_commission:3,
                    manager_id: 0,
                    admin_id: 1,
                    transaction_paid:1,
                    commission_paid:1 },
                    { 
                        transaction_id:2,
                        user_id:2,
                        amount:443,
                        agent_commission:10,
                        manager_id: 0,
                        admin_id: 1,
                        transaction_paid:1,
                        commission_paid:1 },
                ]
            
                await Outstanding.collection.insertMany(outstanding)
        })
    
        afterEach(async () => { 
            
            await Outstanding.deleteMany();
            await server.close(); 
        });  


           describe('GET /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                  it('Should Return 200 for outstanding are stored succesfully', async () => {   
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body[0]))
                                    .toEqual(
                                    expect.arrayContaining(['transaction_id','user_id','amount','agent_commission',
                                    'manager_id', 'admin_id', 'transaction_paid','commission_paid']));
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

           

            it('Should Return outstanding if id is valid', async () => {

                        const res = await exec()
                        expect(res.status).toBe(200)
                    })
        
        
    
    
     })
    

      
})

