const express = require("express");
const router = express.Router();
const {
  loginArtist,
  signupArtist,
  logoutArtist,
} = require("../../controller/newArtist/newArtistController");

router.post("/login", loginArtist);

router.post("/signup", signupArtist);

router.get("/logout", logoutArtist);
//become a Trove artist

module.exports = router;
