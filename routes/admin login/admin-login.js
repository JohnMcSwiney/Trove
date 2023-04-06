const express = require("express");
const router = express.Router();
const {
  adminLogin,
  createAdmin,
  logoutAdmin,
} = require("../../controllers/login-signup/login-signup");

router.post("/login", adminLogin);
router.post("/createAdmin", createAdmin);
router.get("/logout", logoutAdmin);
module.exports = router;
