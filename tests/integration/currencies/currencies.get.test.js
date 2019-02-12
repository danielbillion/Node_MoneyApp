const {User} = require('../../../models/user');
const {Currency} = require('../../../models/currency');
const request = require('supertest');
const mongoose = require('mongoose');
// POST api/rates
    // Return 401 if user is not logged in 
    // Return 400 if there is a missing Input property
    // Return 200 if reques is valid
   
describe('GET  /api/currencies', ()=>{
        
    let server;  
    let token;
    let newRate;
    let testData
    let id
    

  const exec = async () => {
    return await request(server)
      .get('/api/currencies/')
      .set('x-auth-token', token)
      .send();
  };

  const execOne = async () => {
    return await request(server)
      .get('/api/currencies/' + id)
      .set('x-auth-token', token)
      .send();
  };

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()

            token = new User({isAdmin:true}).generateAuthToken();
            
           
            const currencies = [
                { user_id:0,
                origin:'United Kingdom',
                origin_symbol:'UK',
                destination:'Nigeria',
                destination_symbol:'NG',
                code:'UK-NG',
                income_category:'commission'},
                { user_id:0,
                    origin:'United Kingdom',
                    origin_symbol:'UK',
                    destination:'Ghana',
                    destination_symbol:'GH',
                    code:'UK-GH',
                    income_category:'commission'},       
            
                ]
            
                await Currency.collection.insertMany(currencies)
        })
    
        afterEach(async () => { 
            
            await Currency.deleteMany();
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
                
                        it('Should Return 200 for all rates', async () => {   
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect(res.body.some(c => c.origin === 'United Kingdom')).toBeTruthy()
                                expect(res.body.some(c => c.origin_symbol === 'UK')).toBeTruthy()
                        })   
                
                     
           })

           describe('GET  api/currencies/:id',  async () => {

            it('Should Return 401 if user is not logged in', async () => {
                    
                token = '';
                    
                const res = await exec();
        
                expect(res.status).toBe(401);
            })

            it('Should  Return 404 if id is not valid', async () => {
                    id = 1;
                const res = await execOne(); 
                     expect(res.status).toBe(404);
                      
                })

            it('Should Return 200 if Currency exist', async () => {

                    const res = await exec()
                         expect(res.status).toBe(200)
                         expect(Object.keys(res.body[0])).toEqual(
                            expect.arrayContaining(['_id', 'user_id', 'origin',
                            'origin_symbol', 'destination','destination_symbol','code','income_category']));
                       
                    })
        
        
    
    
    })
    

      
})

