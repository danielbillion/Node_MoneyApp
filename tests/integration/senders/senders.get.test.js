const {User} = require('../../../models/user');
const {Sender} = require('../../../models/sender');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('GET  /api/senders', ()=>{
        
    let server;  
    let token;
   
    let testData
 
    

  const exec = async () => {
    return await request(server)
      .get('/api/senders/')
      .set('x-auth-token', token)
      .send();
  };

  const execOne = async () => {
    return await request(server)
      .get('/api/senders/' + id)
      .set('x-auth-token', token)
      .send();
  };

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
           
            token = new User({isAdmin:true}).generateAuthToken();
            
           
            const senders =  [{user_id:1,fname:'jojose',lname:'camaras',
                                mname:'dongora',name:'camara dongora',
                                email:'danielbi@yah.com',mobile:'18876567',phone:'1876789',
                                dob:'23/03/2019',address:'22 awes str',
                                postcode:'e16 ere',title:'Mr',currency_id:'1',
                                address_id:'1',photo_id:'1'
                            },
                            {user_id:2,fname:'lojose',lname:'bolasder',
                            mname:'Tongora',name:'camara dongora',
                            email:'one@yah.com',mobile:'18876567',phone:'0876789',
                            dob:'23/03/2019',address:'22 awes str',
                            postcode:'e16 ere',title:'Mr',currency_id:'1',
                            address_id:'1',photo_id:'1'
                        }]
            
                await Sender.collection.insertMany(senders)
        })
    
        afterEach(async () => { 
            
            await Sender.deleteMany();
            await server.close(); 
        });  


           describe('GET /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                  it('Should Return 200 for sender are available', async () => {   
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body[0]))
                                    .toEqual(
                                    expect.arrayContaining( ['user_id','fname','lname',
                                    'mname','name','email','mobile','phone',
                                    'dob','address','postcode','title','currency_id',
                                    'address_id','photo_id'
                                    ]));
                        })   
                
                     
           })

           describe('GET  api/:id',  async () => {

            it('Should Return 401 if user is not logged in', async () => {
                    
                token = '';
                    
                const res = await execOne();
        
                expect(res.status).toBe(401);
            })

          
             it('Should  Return 404 if id is invalid', async () => {
                    id = 1;
                     const res = await execOne(); 
                     expect(res.status).toBe(404);
                      
                })

           

            it('Should Return sender if id is valid', async () => {

                        const res = await execOne()
                        expect(res.status).toBe(200)
                    })
        
        
    
    
     })
    

      
})

