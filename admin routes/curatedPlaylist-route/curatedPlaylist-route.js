const express = require('express');
const router = express.Router()
const {
    getAllCuratedPlaylist,
    getACuratedPlaylist,
    createCuratedPlaylist,
    getRandomCuratedPlaylist,
    updateCuratedPlaylist,
    deleteCuratedPlaylist,
} = require('../../admin controllers/curatedPlaylist/curatedPlaylistController');

router.get('/', getAllCuratedPlaylist);

router.get('/:id', getACuratedPlaylist);

router.post('/', createCuratedPlaylist);

// router.post('/', generateRandomCuratedPlaylist);

router.post('/trove-picks', getRandomCuratedPlaylist);

router.patch('/:id', updateCuratedPlaylist);

router.delete('/:id', deleteCuratedPlaylist);

module.exports = router;