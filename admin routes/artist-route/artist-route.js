const express = require("express");
const router = express.Router();
const {
  getAllArtist,
  getAnArtist,
  followArtist,
  unfollowArtist,
} = require("../../admin controllers/artist/artistController");

//get all
router.get("/", getAllArtist);

//get an artist
router.get("/:id", getAnArtist);

router.post("/follow/:id", followArtist);

router.post("/removeFollow/:id", unfollowArtist);

module.exports = router;
