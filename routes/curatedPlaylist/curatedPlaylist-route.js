const express = require('express');
const router = express.Router();
const cron = require("node-cron");
const CuratedPlaylist = require("../../models/curatedPlaylists/curatedPlaylist");


const {
    getAllCuratedPlaylist,
    getACuratedPlaylist,
    createCuratedPlaylist,
    getRandomCuratedPlaylist,
    generateCuratedPlaylists,
    updateCuratedPlaylist,
    deleteCuratedPlaylist,
} = require('../../controllers/curatedPlaylist/curatedPlaylist');

router.get('/', getAllCuratedPlaylist);

router.get('/:id', getACuratedPlaylist);

router.post('/', createCuratedPlaylist);

router.post('/trove-picks', generateCuratedPlaylists);


// router.post('/', generateRandomCuratedPlaylist);


router.patch('/:id', updateCuratedPlaylist);

router.delete('/:id', deleteCuratedPlaylist);

cron.schedule("0 0 * * *", async () => {
    try {
        await CuratedPlaylist.deleteMany({ isGenerated: true });
        await generateCuratedPlaylists();
        console.log("generated curated playlists!");
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;