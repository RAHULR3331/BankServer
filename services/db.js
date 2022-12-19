 // 1 import mongoose
 const mongoose=require("mongoose");
 //2 state connection string via mongoose
 mongoose.connect('mongodb://localstorage:27017/Bankserver.user',
 {
useNewUrlParser:true
 });

 //define bank db model

 const User=mongoose.model('User',
 {
    //schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
 })
 //export collection 
 module.exports={
    User
 }