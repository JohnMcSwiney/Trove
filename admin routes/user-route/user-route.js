const express = require("express");
const router = express.Router();
const {
  createUser,
  getAUser,
  getAllUser,
  deleteUser,
  updateUser,
  updateUserPassword,
  updateUserEmail,
  updateUserAccountTab,
} = require("../../admin controllers/user/userController");

// Getting all
router.get("/", getAllUser);

// Getting One
router.get("/:id", getAUser);

// Creating one
router.post("/", createUser);

// Updating One
router.patch("/:id", updateUser);

//update user password
router.patch("/up/:id", updateUserPassword);

//update user email
router.patch("/ue/:id", updateUserEmail);

//update user general info
router.patch("/ua/:id", updateUserAccountTab);

// Deleting One
router.delete("/:id", deleteUser);

module.exports = router;
