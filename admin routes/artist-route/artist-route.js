const express = require('express');
const router = express.Router();
const { getAllArtist,
    getAnArtist,
    createArtist,
    updateArtist,
    deleteArtist } = require('../../admin controllers/artist/artistController')

//get all
router.get('/', getAllArtist);

//get an artist
router.get('/:id', getAnArtist);

//create an artist
router.post('/', createArtist);

//update an artist
router.patch('/:id', updateArtist);
//detele an artist
router.delete('/:id', deleteArtist);

module.exports = router;