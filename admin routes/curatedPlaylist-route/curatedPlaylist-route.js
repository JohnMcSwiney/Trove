const express = require('express');
const router = express.Router();
const cron = require("node-cron");
const CuratedPlaylist = require("../../models/curatedPlaylist model/curatedPlaylist-model");


const {
    getAllCuratedPlaylist,
    getACuratedPlaylist,
    createCuratedPlaylist,
    getRandomCuratedPlaylist,
    generateCuratedPlaylists,
    updateCuratedPlaylist,
    deleteCuratedPlaylist,
} = require('../../admin controllers/curatedPlaylist/curatedPlaylistController');

router.get('/', getAllCuratedPlaylist);

router.get('/:id', getACuratedPlaylist);

router.post('/', createCuratedPlaylist);

// router.post('/', generateRandomCuratedPlaylist);


router.patch('/:id', updateCuratedPlaylist);

router.delete('/:id', deleteCuratedPlaylist);

cron.schedule("0 0 * * 0", async () => {
    try {
        router.post('/trove-picks', generateCuratedPlaylists);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;