const {User} = require('../../../models/user');
const {Currency} = require('../../../models/currency');
const request = require('supertest');
const mongoose = require('mongoose');
// POST api/rates
    // Return 401 if user is not logged in 
    // Return 400 if there is a missing Input property
    // Return 200 if reques is valid
   
describe('POST  /api/currencies', ()=>{
        
    let server;  
    let token;
    let testData
    let id
    

  const exec = async () => {
    return await request(server)
      .post('/api/currencies/')
      .set('x-auth-token', token)
      .send(testData);
  };

 
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()

            token = new User({isAdmin:true}).generateAuthToken();
            
           
            testData = 
                { 
                user_id:0,
                origin:'United Kingdom',
                origin_symbol:'UK',
                destination:'Nigeria',
                destination_symbol:'NG',
                code:'UK-NG',
                income_category:'commission'},
            
                new Currency(testData).save()
        })
    
        afterEach(async () => { 
            
            await Currency.deleteMany();
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
                    
            it('Should Return 400 if any of post input is missing', async () => {   
                            delete testData.user_id
                           const res = await exec()
                           expect(res.status).toBe(400)
                   }) 
                
            it('Should Return 200 if have a valid request', async () => {
                   const res = await exec();
                   expect(res.status).toBe(200);
                  expect(res.body).toMatchObject(testData)
                })   
                
                     
           })

         
    

      
})

