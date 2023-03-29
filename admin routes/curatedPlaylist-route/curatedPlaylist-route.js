const express = require('express');
const router = express.Router()
const  {
    getAllCuratedPlaylist,
    getCuratedPlaylist,
    createCuratedPlaylist,
    updateCuratedPlaylist,
    deleteCuratedPlaylist
} = require('../../admin controllers/curated/curatedPlaylistController');

router.get('/',getAllCuratedPlaylist);

router.get('/:id', getCuratedPlaylist);

router.post('/',createCuratedPlaylist);

router.patch('/:id', updateCuratedPlaylist);

router.delete('/:id', deleteCuratedPlaylist);

module.exports= router;