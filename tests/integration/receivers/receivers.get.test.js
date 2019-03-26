const {User} = require('../../../models/user');
const {Receiver} = require('../../../models/receiver');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('GET  /api/receivers', ()=>{
        
    let server;  
    let token;
   
    let testData
 
    

  const exec = async () => {
    return await request(server)
      .get('/api/receivers/')
      .set('x-auth-token', token)
      .send();
  };

  const execOne = async () => {
    return await request(server)
      .get('/api/receivers/' + id)
      .set('x-auth-token', token)
      .send();
  };

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
           
            token = new User({isAdmin:true}).generateAuthToken();
            
            const receivers =  [{user_id:1,sender_id:2,
                                    fname:'jojose',lname:'camaras',
                                phone:'087678',bank:'sky',
                                transfer_type:'bank',identity_type:'none',
                                account_number:'1876789',
                               },
                            ]
            
                await Receiver.collection.insertMany(receivers)
        })
    
        afterEach(async () => { 
            
            await Receiver.deleteMany();
            await server.close(); 
        });  


           describe('GET /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                  it('Should Return 200 for receiver are available', async () => {   
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body[0]))
                                    .toEqual(
                                    expect.arrayContaining( [
                                        'fname',
                                        'lname',
                                        'user_id',
                                        'sender_id',
                                        'phone',
                                        'bank',
                                        'transfer_type',
                                        'identity_type',
                                        'account_number',
                                
                                    ]));
                        })   
                
                     
           })

           describe('GET  api/:id',  async () => {

            it('Should Return 401 if user is not logged in', async () => {
                    
                token = '';
                    
                const res = await execOne();
        
                expect(res.status).toBe(401);
            })

          
             it('Should  Return 404 if id is invalid', async () => {
                    id = 1;
                     const res = await execOne(); 
                     expect(res.status).toBe(404);
                      
                })

           

            it('Should Return receiver if id is valid', async () => {

                        const res = await execOne()
                        expect(res.status).toBe(200)
                    })
        
        
    
    
     })
    

      
})

