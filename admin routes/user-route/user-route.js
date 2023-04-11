const express = require("express");
const router = express.Router();
const {
  getAUser,
  getAllUser,
  updateUserPassword,
  updateUserEmail,
  updateUserAccountTab,
  resetUserPassword,
  verifyResetCode,
  updateNewPassword
} = require("../../admin controllers/user/userController");

// Getting all
router.get("/", getAllUser);

// Getting One
router.get("/:id", getAUser);

//update user password
router.patch("/up/:id", updateUserPassword);

//update user email
router.patch("/ue/:id", updateUserEmail);

//update user general info
router.patch("/ua/:id", updateUserAccountTab);

//forget password
router.post("/forget-password", resetUserPassword);

router.post('/verify-code',verifyResetCode)

router.patch('/new-password', updateNewPassword)

module.exports = router;
