const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSong,
  getArtistSong,
  likedSong,
  dislikeSong,
  songViewed,
  getSongsBySearchCount,
  genreStats,
} = require("../../admin controllers/song/songController");
router.get("/", getAllSongs);

router.get("/:id", getSong);

router.get("/genre-stats/:id", genreStats);

router.get("/artist-songs/:id", getArtistSong);

router.post("/liked/:id", likedSong);

router.post("/removelike/:id", dislikeSong);

router.patch("/update-view/:id", songViewed);

router.get("/artist-topsearch/:id", getSongsBySearchCount);

module.exports = router;
