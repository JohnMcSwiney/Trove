const express = require("express");
const {
  loginUser,
  signupUser,

  logoutUser,
} = require("../../userController/accountController");
const router = express.Router();
//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

router.post("/logout", logoutUser);

module.exports = router;
