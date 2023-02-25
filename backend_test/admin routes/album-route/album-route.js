const express = require('express');
const router = express.Router();
const {
    getAlbum,
    getAllAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum
} = require('../../admin controllers/album/albumController')

router.get('/', getAllAlbum);

router.get('/:id', getAlbum);

router.post('/', createAlbum);

router.patch('/:id', updateAlbum);

router.delete('/:id', deleteAlbum);


module.exports = router;