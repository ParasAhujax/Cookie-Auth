const express = require('express');
const router = express.Router()
const {handleUserLogin,handleUserSignup} = require('../controllers/userController');

router.post('/signup',handleUserSignup)
router.post('/login',handleUserLogin)

module.exports = router;