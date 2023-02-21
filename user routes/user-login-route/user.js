const express = require('express');
const {loginUser, signupUser, verifyUser} = require('../../userController/accountController')
const router = express.Router();
//login route
router.post('/login',loginUser)

//signup route
router.post('/signup',signupUser)

//verify account 
router.get('/verify-email/:id',verifyUser);

module.exports = router;