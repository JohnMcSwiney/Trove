const express = require("express");
const router = express.Router();
const {
  getEP,
  getAllEP,
  getArtistEP,
} = require("../../admin controllers/ep/ep-controller");

router.get("/", getAllEP);

router.get("/:id", getEP);

router.get("/artist-eps/:id", getArtistEP);

module.exports = router;
