const express = require('express');
const {loginUser,loginAuth} = require('../../userController/accountController')
const router = express.Router();
//login route
router.post('/login',loginUser)

router.post('/auth', loginAuth)
//signup route
module.exports = router;