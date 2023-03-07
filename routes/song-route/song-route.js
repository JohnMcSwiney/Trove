const express = require('express');
const router = express.Router();
const {
    getAllSongs,
    getSong,
    createSong,
    deleteSong,
    updateSong
} = require("../../controller/song/songController");

router.post('/', createSong);

router.get('/', getAllSongs);

router.get('/:id', getSong)

router.patch('/:id', updateSong);

router.delete('/:id', deleteSong);
module.exports = router;