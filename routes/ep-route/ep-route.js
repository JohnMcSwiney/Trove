const express = require("express");
const router = express.Router();
const {
  getEP,
  getAllEP,
  createEP,
  getMyEP,
  updateEP,
  deleteEP,
  getUnVerifiedEPs,
} = require("../../controllers/ep/epSupreme");

router.get("/", getAllEP);

router.get("/unverified", getUnVerifiedEPs);

router.get("/artist-eps/:id", getMyEP);
router.get("/:id", getEP);

router.post("/", createEP);

router.patch("/:id", updateEP);

router.delete("/:id", deleteEP);

module.exports = router;
