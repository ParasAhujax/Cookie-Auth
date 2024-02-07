const express = require('express');
const { connectToMongoDb } = require('./connect');
const cookieParser = require("cookie-parser");
const userRouter = require('./routes/userRoute');
const staticRoute = require('./routes/staticRoute')
const { checkAuth } = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());

connectToMongoDb("mongodb://127.0.0.1:27017/authentication")
.then(console.log("mongoDb connected"))

app.use('/user',userRouter);
app.use('/',checkAuth,staticRoute);

app.listen(3000,()=> console.log("running on 3000"))
