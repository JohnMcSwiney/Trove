const express = require("express");
const router = express.Router();
const {
  getAllArtist,
  getAnArtist,
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



//detele an artist
router.delete("/:id", deleteArtist);

module.exports = router;
