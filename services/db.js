 // 1.import mongoose
 const mongoose=require("mongoose");
 //2.state connection string via mongoose
 mongoose.connect('mongodb://localhost:27017/Bankserver',
 {
useNewUrlParser:true
 });

 //define bank db model

 const User=mongoose.model('User',
 {
    //Schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
 })
 //Export collection
 module.exports={
    User
 }