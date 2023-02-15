const express = require('express');
const router = express.Router();
const {
    getDiscoveryGame,
    getOneDiscoveryGame,
    uploadToDiscoveryGame,
    updateDiscoveryGame,
    deleteFromDiscoveryGame
} = require('../../admin controllers/discoveryGame/discoveryGameController');

//still WIP, may or not need all these routes.

router.get('/', getDiscoveryGame)

//maybe only getting one song idk
// router.get('/:id', getOneDiscoveryGame)

router.patch('/:id', updateDiscoveryGame)

router.post('/', uploadToDiscoveryGame)

router.delete('/:id', deleteFromDiscoveryGame)
module.exports = router;