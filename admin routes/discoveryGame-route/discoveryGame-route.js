const express = require("express");
const router = express.Router();
const {
    loadDiscoveryGame,
    playDiscoveryGame,
    updateDiscoveryGame,
    deleteFromDiscoveryGame
} = require("../../admin controllers/discoveryGame/discoveryGameController");

//get all
router.get("/:id", loadDiscoveryGame);

router.post("/:id", playDiscoveryGame);


module.exports = router;
