const router = require("express").Router();

const {
    uploadSong,
    getAllSongs,
    getSong,
    deleteSong,
    updateSong
} = require("../controllers/songController");

router.post("/", uploadSong);

router.get("/", getAllSongs);

router.get("/:id", getSong);

router.delete("/:id", deleteSong);

router.patch("/:id", updateSong);

module.exports = router;
