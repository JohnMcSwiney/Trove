const express = require("express");
const mongoose = require("mongoose");
const User = require("../../models/user model/user-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");
const Song = require("../../models/song model/song-model");
const EP = require("../../models/ep model/ep-model");
const router = express.Router();

const SONG_LIMIT = 5;
const ARTIST_LIMIT = 1;

router.get("/:search", async (req, res) => {
  const { search } = req.params;
  console.log(search);
  try {
    // const user = await User.find({ displayName: search });
    const artists = await Artist.find({
      artistName: { $regex: new RegExp(search, "i") },
    });

    const albums = await Album.find({
      albumName: { $regex: new RegExp(search, "i") },
      isVerified: true,
    })
      .populate("artist")
      .exec();

    const eps = await EP.find({
      epName: { $regex: new RegExp(search, "i") },
      isVerified: true,
    })
      .populate("artist")
      .exec();
    const songs = await Song.find({
      isVerified: true,
      $or: [
        {
          title: { $regex: new RegExp(search, "i") }
        },
        { artist: { $in: artists.map((artist) => artist._id) } },
      ]
    }
    )
      .populate("artist")
      .populate("album")
      .populate('ep')
      .exec();

    res.status(201).json({ artists, songs, albums, eps });
  } catch (error) {
    res.status(404).json({ error: `No results found for "${search}"` });
  }
});

module.exports = router;
