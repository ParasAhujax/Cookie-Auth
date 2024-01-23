const express = require('express');
const mongoose = require('mongoose');
const app = express();
require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

const userRouter = require('./routes/user');

mongoose.connect("mongodb://127.0.0.1:27017/authentication")
.then(()=>{
    console.log("mongoDb connected");
}).catch(err=>console.log("error:",err))

app.use('/user',userRouter)

app.listen(3000,()=> console.log("running on 3000"))
