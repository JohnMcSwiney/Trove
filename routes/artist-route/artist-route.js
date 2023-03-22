const express = require("express");
const router = express.Router();
const {
  getAllArtist,
  getAnArtist,
  createArtist,
  updateArtist,
  deleteArtist,
  updateGeneralInfo,
  updateEmail,
  updatePassword,
} = require("../../controller/artist/artistController");

//get all
router.get("/", getAllArtist);

//get an artist
router.get("/:id", getAnArtist);
//update general info
router.patch("/updateinfo/:id", updateGeneralInfo);
router.patch("/updatepassword/:id", updatePassword);
router.patch("/updateemail/:id", updateEmail);

//create an artist
router.post("/", createArtist);

//update an artist
router.patch("/:id", updateArtist);
//detele an artist
router.delete("/:id", deleteArtist);

module.exports = router;
