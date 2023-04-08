const express = require("express");
const router = express.Router();
const {
  getAlbum,
  getAllAlbum,
  getArtistAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getUnVerifiedAlbums,
  approveAlbum,
  rejectAlbum,
} = require("../../controllers/album/album");

router.get("/", getAllAlbum);
router.get("/unverified", getUnVerifiedAlbums);

router.post("/approved/:id", approveAlbum);
router.delete("/rejected/:id", rejectAlbum);
router.get("/:id", getAlbum);

router.get("/artist-albums/:id", getArtistAlbum);

router.post("/", createAlbum);

router.patch("/:id", updateAlbum);

router.delete("/:id", deleteAlbum);

module.exports = router;
