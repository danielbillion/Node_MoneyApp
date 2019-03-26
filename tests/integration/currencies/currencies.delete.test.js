const {User} = require('../../../models/user');
const {Currency} = require('../../../models/currency');
const request = require('supertest');
const mongoose = require('mongoose');

describe('DELETE  /api/currencies', ()=>{
        
    let server;  
    let token;
    let testData
    let id
    let newCurrency;
    

  const exec = async () => {
    return await request(server)
      .delete('/api/currencies/' + id)
      .set('x-auth-token', token)
      .send();
  };

 

 
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            currencyId = mongoose.Types.ObjectId()

            token = new User({isAdmin:true}).generateAuthToken();
            
           
                testData = { 
                    _id:currencyId,
                    user_id:0,
                    origin:'United Kingdom',
                    origin_symbol:'UK',
                    destination:'Nigeria',
                    destination_symbol:'NG',
                    code:'UK-NG',
                    income_category:'commission'
                };
                
                newCurrency =  await new Currency(testData).save();
                id = newCurrency._id
              

        })
    
        afterEach(async () => { 
            
            await Currency.deleteMany();
            await server.close(); 
        });  


        describe('DELETE /:id', async () => {
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

             it('Should Return 404 if id is not valid', async () => {

                id = 1;
                const res = await exec();
    
            expect(res.status).toBe(404)
            })
                    
           
                
            it('Should Return 200 if id is valid & there is update', async () => {

            
                const res = await exec();
                expect(res.status).toBe(200);
                
                expect(res.body).toHaveProperty('_id', newCurrency._id.toHexString());
            })   
                
                     
           })

         
    

      
})

