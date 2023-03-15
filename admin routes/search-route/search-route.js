const express = require("express");
const mongoose = require("mongoose");
const User = require("../../models/user model/user-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");
const Song = require("../../models/song model/song-model");
// const EP = require('../../models/')
const router = express.Router();

router.get("/:search", async (req, res) => {
  const { search } = req.params;

  try {
    const user = await User.find({ displayName: search });
    const artists = await Artist.find({
      artistName: { $regex: new RegExp(search, "i") },
    });
    const albums = await Album.find({
      albumName: { $regex: new RegExp(search, "i") },
    });
    const songs = await Song.find({
      title: { $regex: new RegExp(search, "i") },
    });

    res.status(201).json({ artists, songs, albums });
  } catch {
    res.status(201).json();
  }
});
module.exports = router;
