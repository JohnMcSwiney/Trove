const express = require("express");
const router = express.Router();
const {
  getAlbum,
  getAllAlbum,
  getArtistAlbum,
} = require("../../admin controllers/album/albumController");

router.get("/", getAllAlbum);

router.get("/:id", getAlbum);

router.get("/artist-albums/:id", getArtistAlbum);

module.exports = router;
