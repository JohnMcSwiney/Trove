const express = require("express");
const router = express.Router();
const {
  loginArtist,
  signupArtist,
} = require("../../controller/newArtist/newArtistController");

//
router.post("/login", loginArtist);
router.post("/signup", signupArtist);

//become a Trove artist
router.get("");

module.exports = router;
