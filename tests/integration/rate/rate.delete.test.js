const {User} = require('../../../models/user');
const {Rate} = require('../../../models/rate');
const request = require('supertest');
const mongoose = require('mongoose');
// POST api/rates
    // Return 401 if user is not logged in 
    // Return 400 if there is a missing Input property
    // Return 200 if reques is valid
   
describe('DELETE  /api/rates', ()=>{
        
    let server;  
    let token;
    let newRate;
    let testData
    let id
    
  const exec = async () => {
    return await request(server)
      .delete('/api/rates/' + id)
      .set('x-auth-token', token)
      .send();
  };

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            

            token = new User({isAdmin:true}).generateAuthToken();
            testData = {       
                                rate:500,
                                sold_rate:0,
                                bou_rate:0,
                                user_id:0 ,
                                currency_id:1
                            };
                        
            newRate =  await new Rate(testData).save();
            id = newRate._id
        })
    
        afterEach(async () => { 
            
            await Rate.deleteMany();
            await server.close(); 
        });  


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
       
            it('Should Return 404 id is not supplied', async () => {   
                    id = 1;
                    const res = await exec();
                    expect(res.status).toBe(404);
             }) 

         
        //  it('Should Return 404  given id is not found', async () => {         
        //     id = mongoose.Types.ObjectId()
        //    const res = await exec()
        //    expect(res.status).toBe(404)
        // })  
       
           it('Should Update if ID is valid', async () => {
                    const res = await exec();

                  expect(res.body).toHaveProperty('_id');
                  expect(res.body).toHaveProperty('_id', newRate._id.toHexString());
       
           }) 
    

      
})

