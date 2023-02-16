const express = require('express');
const router = express.Router();
const {
    getTaste,
    updateTaste,
    createTaste,
    deleteTaste
} = require('../../admin controllers/taste profile/tastePController');

//get your taste profile 

    router.get('/', getTaste);

    router.post('/', createTaste);

    router.patch('/:id', updateTaste);

    router.delete('/:id', deleteTaste);


module.exports = router;