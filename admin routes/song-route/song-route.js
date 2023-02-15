const express = require('express');
const router = express.Router();
const {
    getAllSongs,
    getSong,
    createSong,
    deleteSong,
    updateSong
} = require('../../admin controllers/song/songController')
router.get('/',getAllSongs);

router.get('/:id',getSong)

router.post('/',createSong);

router.patch('/:id',updateSong)

router.delete('/:id',deleteSong)
module.exports = router;