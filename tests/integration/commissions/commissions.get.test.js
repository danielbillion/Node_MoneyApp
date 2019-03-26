const {User} = require('../../../models/user');
const {Commission} = require('../../../models/commission');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('GET  /api/commissions', ()=>{
        
    let server;  
    let token;
    let newRate;
    let testData
    let amount
    let currency_id
    let user_id
    

  const exec = async () => {
    return await request(server)
      .get('/api/commissions/')
      .set('x-auth-token', token)
      .send();
  };

  const execOne = async () => {
    return await request(server)
      .get('/api/commissions/' + amount + '/' + currency_id + '/' + user_id)
      .set('x-auth-token', token)
      .send();
  };

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
            user_id = 0;
            currency_id = 1;
            amount = 100;

            token = new User({isAdmin:true}).generateAuthToken();
            
           
            const commissions = [
                { 
                start_from:0,
                end_at:100,
                value:5,
                agent_quota:50,
                user_id:0,
                currency_id:1},
                { 
                    start_from:100,
                    end_at:200,
                    value:15,
                    agent_quota:50,
                    user_id:0,
                    currency_id:1},       
            
                ]
            
                await Commission.collection.insertMany(commissions)
        })
    
        afterEach(async () => { 
            
            await Commission.deleteMany();
            await server.close(); 
        });  


           describe('GET /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                    it('Should Return 403 if user is not admin', async () => {

                                token = new User({isAdmin:false}).generateAuthToken();
                                const res = await exec();
                    
                            expect(res.status).toBe(403)
                        })
                
                        it('Should Return 200 for commission are available', async () => {   
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body[0]))
                                    .toEqual(
                                    expect.arrayContaining(['start_from', 'end_at', 
                                    'value', 'agent_quota', 'user_id','currency_id']));
                        })   
                
                     
           })

           describe('GET  api/commissions/:amount/:currency_id',  async () => {

            it('Should Return 401 if user is not logged in', async () => {
                    
                token = '';
                    
                const res = await exec();
        
                expect(res.status).toBe(401);
            })

            it('Should  Return 400 if amount is not empty', async () => {
                    amount = "";
                const res = await execOne(); 
                     expect(res.status).toBe(404);
                      
                })
             it('Should  Return 400 if amount is not empty', async () => {
                    currency_id = "";
                const res = await execOne(); 
                     expect(res.status).toBe(404);
                      
                })

            it('Should  Return 400 if amount is not empty', async () => {
                    user_id = "";
                const res = await execOne(); 
                     expect(res.status).toBe(404);
                      
                })

            it('Should Return 200 inputs are valid', async () => {

                    const res = await exec()
                         expect(res.status).toBe(200)
                    })
        
        
    
    
     })
    

      
})

