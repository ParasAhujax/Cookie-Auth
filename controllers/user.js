const User = require('../models/user');
const {v4:uuidv4} = require('uuid');
const {setUser} = require('../auth');
const { use } = require('passport');

async function handleUserSignup(req,res){
    console.log(req.body);

    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password
    });
    res.send("Home")   //renders back to homepage after signup
}

async function handleUserLogin(req,res){
    console.log(req.body);
    const{email,password}=req.body;

    const user = await User.findOne({email,password});

    if(!user){
        res.send("error:invalid username or password")
    }

    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId)
    res.send("login successfull")
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}