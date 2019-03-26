const {User} = require('../../../models/user');
const {Commission} = require('../../../models/commission');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('POST  /api/commissions', ()=>{
        
    let server;  
    let token;
    let newCommission;
    let testData
    let amount
    let commission_id
    let user_id
    

  const exec = async () => {
    return await request(server)
      .post('/api/commissions/')
      .set('x-auth-token', token)
      .send(testData);
  };

  

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
            user_id = 0;
            currency_id = 1;
            amount = 100;

            token = new User({isAdmin:true}).generateAuthToken();
            
           
             testData =
                { 
                start_from:0,
                end_at:100,
                value:5,
                agent_quota:50,
                user_id:0,
                currency_id:1};
                    
                
              // newCommission  =  await new Commission(testData).save()
              newCommission = new Commission(testData);
              await newCommission.save();
        })
    
        afterEach(async () => { 
            
            await Commission.deleteMany();
            await server.close(); 
        });  


           describe('POST /', async () => {
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

                        it('Should Return 400 essential input is missing', async () => {

                             testData = {}
                            const res = await exec();
                
                        expect(res.status).toBe(400)
                    })
                
                        it('Should Return 200 if successfully posted', async () => {   
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body))
                                    .toEqual(
                                    expect.arrayContaining(['start_from','end_at','value',
                                    'agent_quota','currency_id',
                                       'user_id']));
                        })   
                
                     
           })

   
    

      
})

