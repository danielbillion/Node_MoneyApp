const {User} = require('../../../models/user');
const {Sender} = require('../../../models/sender');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('POST  /api/senders', ()=>{
        
    let server;  
    let token;
    let sender
    let testData
 
    

  const exec = async () => {
    return await request(server)
      .post('/api/senders/')
      .set('x-auth-token', token)
      .send(testData);
  };

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
           
            token = new User({isAdmin:true}).generateAuthToken();
            
           
            testData = {
                         user_id:4,
                         fname:"jojose",
                         lname:"camaras",
                         mname:"dongora",
                        name:"camara dongora",
                        email:"kamarsdsa@yah.com",
                        mobile:"18876567",
                        phone:"1876789",
                        dob:"23/03/2019",
                        address:"22 awes str",
                        postcode:"e16 ere",
                        title:"Mr",
                        currency_id:"1",
                        address_id:1,
                        photo_id:1
                        };
                sender = new Sender(testData)
                await sender.save()
                
        })
    
        afterEach(async () => { 
            
            await Sender.deleteMany();
            await server.close(); 
        });  


           describe('POST /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                    it('Should Return 400 if any inputs are missing', async () => {
                    
                        testData = {};
                            
                        const res = await exec();
                
                        expect(res.status).toBe(400)
                    })

                  
                    it('Should Return 200 if posted succesfully', async () => {   
                       
                        const res = await exec();
                        console.log(res.body)
                        expect(res.status).toBe(200);
                        // expect
                        //     (Object.keys(res.body))
                        //     .toEqual(
                        //     expect.arrayContaining( ['user_id','fname','lname',
                        //     'mname','name','email','mobile','phone',
                        //     'dob','address','postcode','title','currency_id',
                        //     'address_id','photo_id'
                        //     ]));
                })  
                        
                
                     
           })

          
    

      
})

