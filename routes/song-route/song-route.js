const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSong,
  getArtistSong,
  createSong,
  deleteSong,
  updateSong,
} = require("../../controllers/song/song");
router.get("/", getAllSongs);

router.get("/:id", getSong);

router.get("/artist-songs/:id", getArtistSong);

router.post("/", createSong);

router.patch("/:id", updateSong);

router.delete("/:id", deleteSong);

module.exports = router;
