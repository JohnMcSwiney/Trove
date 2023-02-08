const router = require("express").Router();

const {
    createAlbum
} = require("../controllers/albumController");

router.post("/", createAlbum);

// router.get("/", getAllSongs);

// router.get("/:id", getSong);

// router.delete("/:id", deleteSong);

// router.patch("/:id", updateSong);

module.exports = router;
