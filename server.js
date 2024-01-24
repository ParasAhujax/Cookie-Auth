const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();

require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/authentication")
.then(()=>{
    console.log("mongoDb connected");
}).catch(err=>console.log("error:",err))

const userRouter = require('./routes/userRoute');
const staticRoute = require('./routes/staticRoute')
const { checkAuth } = require('./middleware/auth');

app.use('/user',userRouter);
app.use('/',checkAuth,staticRoute);

app.listen(3000,()=> console.log("running on 3000"))
