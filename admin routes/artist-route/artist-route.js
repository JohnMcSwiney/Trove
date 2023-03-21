const express = require("express");
const router = express.Router();
const {
  getAllArtist,
  getAnArtist,
  createArtist,
  updateArtist,
  deleteArtist,
  followArtist,
  unfollowArtist,
} = require("../../admin controllers/artist/artistController");

//get all
router.get("/", getAllArtist);

//get an artist
router.get("/:id", getAnArtist);

//create an artist
router.post("/", createArtist);

//update an artist
router.patch("/:id", updateArtist);
//detele an artist
router.delete("/:id", deleteArtist);

router.post("/follow/:id", followArtist);

router.post("/removeFollow/:id", unfollowArtist);

module.exports = router;
