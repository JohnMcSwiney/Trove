const express = require("express");
const router = express.Router();
const {
  getAlbum,
  getAllAlbum,
  getArtistAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../../controllers/album/album");

router.get("/", getAllAlbum);

router.get("/:id", getAlbum);

router.get("/artist-albums/:id", getArtistAlbum);

router.post("/", createAlbum);

router.patch("/:id", updateAlbum);

router.delete("/:id", deleteAlbum);

module.exports = router;
