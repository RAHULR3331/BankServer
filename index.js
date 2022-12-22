 //Server Creation




 // 1)import Express
 const express = require('express');


 //import data services
 const dataservice = require('./services/data.service')

 //import cors
 const cors =  require('cors')
 //import jwt
 const jwt = require('jsonWebtoken')


 // 2)Create an application using the Exxpress
 const app = express();

 //To parse JSON from request body
 app.use(express.json())
 
//give command to share data via cors
 app.use(cors({
    origin:'http://localhost:4200'
 }))

 // 3)Create a Port Number
 app.listen(3000, () => {
     console.log('listening on port 3000 ');
 })
 //Application spesific middleware
 const appMiddileeware = (req, res, next) => {
     console.log("Application spesific middleware");
     next();
 }
 app.use(appMiddileeware)

 //Router specific middleware\
 const jwtMiddleware = (req, res, next) => {
 try {
    
         console.log("Router spesific middleware");
         const token = req.headers['x-access-token'];
         const data = jwt.verify(token, 'superkey2022');
         console.log(data);
         next();
     }


 catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"please login first"
    })
 }
}




 // 4)resolving HTTP request
 //get,post,put,patch,delete
 //resolving get request
 // app.get('/',(req,res)=>{
 //     res.send('Get request')
 // })

 // //resolving post request
 // app.post('/',(req,res)=>{
 //     res.send('post request')
 // })

 // //resolving put request
 // app.put('/',(req,res)=>{
 //     res.send('put request')
 // })

 // //resolving patch request
 // app.patch('/',(req,res)=>{
 //     res.send('patch request')
 // })

 // //resolving delete request
 // app.delete('/',(req,res)=>{
 //     res.send('delete request')
 // })

 //  API REQUEST
 //Registration request
 app.post('/register', (req, res) => {
     console.log(req.body);
     dataservice.register(req.body.acno, req.body.username, req.body.password)
     .then(result=>{
        res.status(result.statusCode).json(result);

     })
     
     //  res.send('register successfull')
 })

 //Login request
 app.post('/login', (req, res) => {
     console.log(req.body);
     dataservice.login(req.body.acno, req.body.password)
     .then(result=>{
        res.status(result.statusCode).json(result);
     })    
     //  res.send('login successfull')
 })


 //deposite request
 app.post('/deposite', jwtMiddleware, (req, res) => {
     console.log(req.body);
     dataservice.deposite(req.body.acno, req.body.password, req.body.amount)
     .then(result=>{
        res.status(result.statusCode).json(result);
     })
 })
 //  withdraw request

 app.post('/withdraw', jwtMiddleware, (req, res) => {
     console.log(req.body);
     dataservice.withdraw(req.body.acno, req.body.password, req.body.amount)
     .then(result=>{
        res.status(result.statusCode).json(result);
     })
 })


 //transaction request
 app.post('/transaction', jwtMiddleware, (req, res) => {
     console.log(req.body);
     dataservice.getTransaction(req.body.acno)
     .then(result=>{
        res.status(result.statusCode).json(result);
     })
 })


 //delete request