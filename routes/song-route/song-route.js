const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSong,
  getMySong,
  createSong,
  deleteSong,
  updateSong,
} = require("../../controller/song/songController");

router.post("/", createSong);

router.get("/", getAllSongs);

router.get("/artist-songs/:id", getMySong);

router.get("/:id", getSong);

router.patch("/:id", updateSong);

router.delete("/:id", deleteSong);
module.exports = router;
