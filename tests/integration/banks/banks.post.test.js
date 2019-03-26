const {User} = require('../../../models/user');
const {Bank} = require('../../../models/bank');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('POST  /api/banks', ()=>{
        
    let server;  
    let token;
    let bank
    let testData
 
    

  const exec = async () => {
    return await request(server)
      .post('/api/banks/')
      .set('x-auth-token', token)
      .send(testData);
  };

  
  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
            
            token = new User({isAdmin:true}).generateAuthToken();
            testData = { name:'Zenith Bank',status:'p'}
             bank = new Bank(testData);
                
            await bank.save()
        })
    
        afterEach(async () => { 
            
            await Bank.deleteMany();
            await server.close(); 
        });  


           describe('POST /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                    it('Should Return 403 if user is admin', async () => {
                    
                        token = new User({isAdmin:false}).generateAuthToken();
                            
                        const res = await exec();
                
                        expect(res.status).toBe(403)
                    })

                    // it('Should Return 400 if inputs are valid', async () => {
                    
                    //     testData = {};
                            
                    //     const res = await exec();
                
                    //     expect(res.status).toBe(400)
                    // })

                  it('Should Return 200 for bank are available', async () => {   
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body))
                                    .toEqual(
                                    expect.arrayContaining(['name', 'status']));
                        })   
                
                     
           })

         
    

      
})

