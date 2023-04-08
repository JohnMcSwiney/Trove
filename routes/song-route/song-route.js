const express = require("express");
const router = express.Router();
const {
  getAllSongs,
  getSong,
  getArtistSong,
  createSong,
  deleteSong,
  updateSong,
  getUnVerifiedSongs,
  approveSong,
  rejectSingle,
} = require("../../controllers/song/song");
router.get("/", getAllSongs);

router.get("/unverified", getUnVerifiedSongs);

router.get("/:id", getSong);

router.get("/artist-songs/:id", getArtistSong);

router.post("/", createSong);

router.post("/approved/:id", approveSong);
router.delete("/rejected/:id", rejectSingle);

router.patch("/:id", updateSong);

router.delete("/:id", deleteSong);

module.exports = router;
