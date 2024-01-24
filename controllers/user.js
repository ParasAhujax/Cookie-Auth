const User = require('../models/user');
const {v4:uuidv4} = require('uuid');
const {setUser} = require('../auth');

async function handleUserSignup(req,res){
    try{
        const {name,email,password,text} = req.body;
        
        await User.create({
            name,
            email,
            password,
            text
        });
        res.send("Successfully signed up")   
        //we can redirect this further to home page 
    }
    catch(err){
        console.log(err);
        res.send(err.message)
    }
}

async function handleUserLogin(req,res){
    try{
        console.log(req.body);
        const{email,password}=req.body;
        
        const user = await User.findOne({email,password});
        
        if(!user){
            res.send("error:invalid username or password")
        }
        req.user = user;
        console.log(req.user);

        const sessionId = uuidv4();
        setUser(sessionId,user);
        res.cookie("uid",sessionId)
        res.send(`${user.name} login successfull`)
        
    }catch(err){
        console.log(err);
        res.send(err.message);
    }
}
module.exports = {
    handleUserSignup,
    handleUserLogin
}