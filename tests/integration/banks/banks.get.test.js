const {User} = require('../../../models/user');
const {Bank} = require('../../../models/bank');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('GET  /api/banks', ()=>{
        
    let server;  
    let token;
   
    let testData
 
    

  const exec = async () => {
    return await request(server)
      .get('/api/banks/')
      .set('x-auth-token', token)
      .send();
  };

  const execOne = async () => {
    return await request(server)
      .get('/api/banks/' + id)
      .set('x-auth-token', token)
      .send();
  };

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
           
            token = new User({isAdmin:true}).generateAuthToken();
            
           
            const banks = [
                { 
                name:'Zenith Bank',
                status:'p'},
                { 
                    name:'GT Bank',
                    status:'b'}
                ]
            
                await Bank.collection.insertMany(banks)
        })
    
        afterEach(async () => { 
            
            await Bank.deleteMany();
            await server.close(); 
        });  


           describe('GET /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                  it('Should Return 200 for bank are available', async () => {   
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body[0]))
                                    .toEqual(
                                    expect.arrayContaining(['name', 'status']));
                        })   
                
                     
           })

           describe('GET  api/:id',  async () => {

            it('Should Return 401 if user is not logged in', async () => {
                    
                token = '';
                    
                const res = await exec();
        
                expect(res.status).toBe(401);
            })

          
             it('Should  Return 404 if id is invalid', async () => {
                    id = 1;
                     const res = await execOne(); 
                     expect(res.status).toBe(404);
                      
                })

           

            it('Should Return bank if id is valid', async () => {

                        const res = await exec()
                        expect(res.status).toBe(200)
                    })
        
        
    
    
     })
    

      
})

