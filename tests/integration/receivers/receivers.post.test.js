const {User} = require('../../../models/user');
const {Receiver} = require('../../../models/receiver');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('POST  /api/receivers', ()=>{
        
    let server;  
    let token;
   let receiver
    let testData
 
    

  const exec = async () => {
    return await request(server)
      .post('/api/receivers/')
      .set('x-auth-token', token)
      .send(testData);
  };



  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
           
            token = new User({isAdmin:true}).generateAuthToken();
            
            testData =  {
                        user_id:1,
                        sender_id:2,
                        fname:'jojose',
                        lname:'camaras',
                        phone:'087678',
                        bank:'sky',
                        transfer_type:'bank',
                        identity_type:'none',
                        account_number:'1876789',
                               },
                receiver = new Receiver(testData)         
                               
                await receiver.save()
        })
    
        afterEach(async () => { 
            
            await Receiver.deleteMany();
            await server.close(); 
        });  


           describe('POST /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                    it('Should Return 400 if input are incomplete', async () => {
                    
                        testData = {};
                            
                        const res = await exec();
                
                        expect(res.status).toBe(400)
                    })

                  it('Should Return 200 for receiver are available', async () => {   
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body))
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

         
    

      
})

