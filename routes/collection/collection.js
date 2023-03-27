const express = require("express");
const router = express.Router();
const {
  getAllCollection,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
} = require("../../controllers/collection/collection");

router.get("/", getAllCollection);

router.get("/:id", getCollection);

router.post("/", createCollection);

router.patch("/:id", updateCollection);

router.delete("/:id", deleteCollection);

module.exports = router;
