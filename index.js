 //Server Creation

 // 1)import Express
 const express = require('express');
 //  const Express = require.Express;

 //import data services
 const dataservice = require('./services/data.service')

 // 2)Create an application using the Exxpress
 const app = express();

 //To parse JSON from request body
 app.use(express.json())

 // 3)Create a Port Number
 app.listen(3000, () => {
     console.log('listening on port 3000 ');
 })

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
     const result = dataservice.register(req.body.acno, req.body.username, req.body.password)
     res.status(result.statusCode).json(result);
     //  res.send('register successfull')
 })

 //Login request
 app.post('/login', (req, res) => {
     console.log(req.body);
     const result = dataservice.login(req.body.acno, req.body.password)
     res.status(result.statusCode).json(result);
     //  res.send('login successfull')
 })


 //deposite request
 app.post('/deposite', (req, res) => {
     console.log(req.body);
     const result = dataservice.deposite(req.body.acno, req.body.password, req.body.amount)
     res.status(result.statusCode).json(result);
 })
 //  withdraw request

 app.post('/withdraw', (req, res) => {
    console.log(req.body);
    const result = dataservice.withdraw(req.body.acno, req.body.password, req.body.amount)
    res.status(result.statusCode).json(result);
})


 //transaction request
 app.post('/transaction', (req, res) => {
    console.log(req.body);
    const result = dataservice.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result);
})


 //delete request