const express = require("express");
const router = express.Router();
//const cron = require("node-cron");
const CuratedPlaylist = require("../../models/curatedPlaylist model/curatedPlaylist-model");

const {
  getAllCuratedPlaylist,
  getACuratedPlaylist,
  createTopUserSongsPlaylist,
} = require("../../admin controllers/curatedPlaylist/curatedPlaylistController");

router.get("/", getAllCuratedPlaylist);

router.get("/:id", getACuratedPlaylist);

// router.post("/", createTopUserSongsPlaylist);

// cron.schedule("* * * * *", async (req, res) => {
//     try {
//         await CuratedPlaylist.deleteOne({isGenerated: false});
//         await createTopUserSongsPlaylist();
//         console.log("generated curated playlists!");
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({ err: err.message });
//     }
// });

module.exports = router;
