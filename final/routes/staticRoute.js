const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    if(!req.user){
        res.send("not logged in")
    }
    else{
        console.log(`checked for login`);
        res.send(`hello ${req.user.name}, this is your text: ${req.user.text}`)
    }
});

module.exports =  router
