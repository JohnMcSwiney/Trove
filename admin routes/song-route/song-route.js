const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSong,
  getArtistSong,
  createSong,
  deleteSong,
  updateSong,
  likedSong,
  dislikeSong
} = require("../../admin controllers/song/songController");
router.get("/", getAllSongs);

router.get("/:id", getSong);

router.get("/artist-songs/:id", getArtistSong);

router.post("/", createSong);

router.patch("/:id", updateSong);

router.delete("/:id", deleteSong);

router.post("/liked/:id", likedSong);

router.post("/removelike/:id", dislikeSong);


module.exports = router;