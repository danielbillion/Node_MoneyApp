const {User} = require('../../../models/user');
const {Rate} = require('../../../models/rate');
const request = require('supertest');
const mongoose = require('mongoose');
// POST api/rates
    // Return 401 if user is not logged in 
    // Return 400 if there is a missing Input property
    // Return 200 if reques is valid
   
describe('GET  /api/rates', ()=>{
        
    let server;  
    let token;
    let newRate;
    let testData
    let id
    
//   const exec = async () => {
//     return await request(server)
//       .get('/api/rates/' + id)
//       .set('x-auth-token', token)
//       .send();
//   };

  const exec = async () => {
    return await request(server)
      .get('/api/rates/')
      .set('x-auth-token', token)
      .send();
  };

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            

            token = new User({isAdmin:true}).generateAuthToken();
            
            // testData =  {rate:300,sold_rate:0, bou_rate:0, user_id:0,currency_id:1};
            // newRate =  await new Rate(testData).save();
            // id = newRate._id

            const rates = [
                {rate:300,sold_rate:0, bou_rate:0, user_id:0,currency_id:1},      
               {rate:200,sold_rate:0, bou_rate:0, user_id:0,currency_id:2}
                ]
            
                await Rate.collection.insertMany(rates)
        })
    
        afterEach(async () => { 
            
            await Rate.deleteMany();
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
                                expect(res.body.some(r => r.rate === 300)).toBeTruthy()
                                expect(res.body.some(r => r.rate === 200)).toBeTruthy()
                        })   
                
                    // it('Should Update if ID is valid', async () => {
                    //             const res = await exec();

                    //         expect(res.body).toHaveProperty('_id');
                    //         expect(res.body).toHaveProperty('_id', newRate._id.toHexString());
                
                    // }) 
           })

           describe('GET  api/rate/today',  async () => {

            it('Should  Be Null, no rates Exit', async () => {
                await Rate.deleteMany();
                const res = await exec() 
                     expect(res.body.length).toBe(0)
                      
                })

            it('Should Return 200 if Rates exist', async () => {

                    const res = await request(server).get('/api/rates/today') 
                         expect(res.status).toBe(200)
                         expect(Object.keys(res.body[0])).toEqual(
                            expect.arrayContaining(['_id', 'rate', 'bou_rate',
                            'sold_rate', 'currency_id']));
                       
                    })
                })
    

      
})

