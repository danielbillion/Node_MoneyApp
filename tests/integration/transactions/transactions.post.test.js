const {User} = require('../../../models/user');
const {Transaction} = require('../../../models/transaction');
const request = require('supertest');
const mongoose = require('mongoose');

   
describe('POST  /api/transactions', ()=>{
        
    let server;  
    let token;
    let transaction
    let testData
 
    

  const exec = async () => {
    return await request(server)
      .post('/api/transactions/')
      .set('x-auth-token', token)
      .send(testData);
  };

 

  
  
  beforeEach(async () => { 
            server = require('../../../index'); 
            id = mongoose.Types.ObjectId()
           
            token = new User({isAdmin:true}).generateAuthToken();
            
             testData =  {     user_id:1,sender_id:2,receiver_id:1,type:'agent',
                                    amount:300,commission:10,agent_commission:5,
                                    receipt_number:'aswe34',receiver_phone:'0876789',
                                    status:'pending',exchange_rate:340,currency_id:1,
                                     currency_income:'commission',bou_rate:0,sold_rate:0,note:'nothing'
                                
                               },
                            
            transaction = new Transaction(testData).save()
               // await Transaction.collection.insertMany(transactions)
        })
    
 afterEach(async () => { 
            
           await Transaction.deleteMany();
            await server.close(); 
        });  


           describe('POST /', async () => {
                it('Should Return 401 if user is not logged in', async () => {
                    
                        token = '';
                            
                        const res = await exec();
                
                        expect(res.status).toBe(401)
                    })

                    it('Should Return 400 if there are missing field', async () => {
                    
                        testData = {};
                            
                        const res = await exec();
                
                        expect(res.status).toBe(400)
                    })

                  it('Should Return 200 for transaction are available', async () => {   
                                const res = await exec();
                                expect(res.status).toBe(200);
                                expect
                                    (Object.keys(res.body))
                                    .toEqual(
                                    expect.arrayContaining( [
                                        'receipt_number',
                                        'receiver_phone',
                                        'type',
                                        'user_id',
                                        'sender_id',
                                        'receiver_id',
                                        'amount',
                                        'commission',
                                        'agent_commission',
                                        'exchange_rate',
                                        'currency_id',
                                        'currency_income',
                                        'bou_rate',
                                        'sold_rate',
                                        'note',
                                        'status'
                                            ]));
                        })   
                
                     
           })

          

      
})

