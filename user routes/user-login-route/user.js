const express = require('express');
const {loginUser,loginAuth, logoutUser} = require('../../userController/accountController')
const router = express.Router();
//login route
router.post('/login',loginUser)

router.post('/auth', loginAuth)

router.post('/logout', logoutUser)
//signup route
module.exports = router;