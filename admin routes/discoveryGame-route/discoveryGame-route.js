const express = require("express");
const router = express.Router();
const {
    getDiscoveryGame,
    loadDiscoveryGame,
    updateDiscoveryGame,
    deleteFromDiscoveryGame
} = require("../../admin controllers/discoveryGame/discoveryGameController");

//get all
router.post("/", loadDiscoveryGame);

module.exports = router;
