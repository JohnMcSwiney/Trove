const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSong,
  getMySong,
  getMyTopSearchSong,
  getSongsBySearchCount,
  getMyTopLovedSong,
  getSongsByLoveCount,
  createSong,
  deleteSong,
  updateSong,
} = require("../../controller/song/songControllerSuprem");

router.post("/", createSong);

router.get("/", getAllSongs);

router.get("/artist-songs/:id", getMySong);

router.get("/artist-topsearch/:id", getSongsBySearchCount);

router.get("/artist-toploved/:id", getSongsByLoveCount);

// router.get("/artist-toploved/:id", getMyTopLovedSong);

router.get("/:id", getSong);

router.patch("/:id", updateSong);

router.delete("/:id", deleteSong);
module.exports = router;
