const functions = require("firebase-functions");
const express=require('express');
const cors=require('cors');
const stripe=require('stripe')(
    'sk_test_51OPQzIE083Ya9kcUNOSBmFzlbY4bi6QwI1bu4dXb8NVwpGNEoOuFgfepBceqBiyXIKJczWL7MV2mwGepdlIziA5C00ItUXVfqL'
)
//App Config
const app=express();
//Use Middlewares
app.use(cors({origin:true}));
app.use(express.json());//use this to generate codes in json format


//use Route method
app.get("/",(request,response)=>response.status(200).send("hello world"));
//Post Method
app.post('/payments/create',async(request,response)=>{
    
    const total=request.query.total;
    console.log("Payment Request Recieved for this amount>>>",total);
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,//submit of the currency
        currency:"usd",
    });
    //Or Created
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    });
});
app.listen(3030,(error)=>{
    if(error)
    console.log('error in connection',error)
else
console.log('connected @ 3030')
})

//Listen Command 
exports.api=functions.https.onRequest(app);

//After running firebase emulator:start
//I get base url which (http://127.0.0.1:5001/client-ba23e/us-central1/api)