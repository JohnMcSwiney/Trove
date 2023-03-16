const express = require("express");
const mongoose = require("mongoose");
const User = require("../../models/user model/user-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");
const Song = require("../../models/song model/song-model");
// const EP = require('../../models/')
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
    })
      .populate("artist")
      .exec();

    const songs = await Song.find({
      title: { $regex: new RegExp(search, "i") },
    })
      .populate("artist")
      .exec();
    if (search.length > 4) {
      const artistUpdates = artists.map(async (artist) => {
        await Artist.updateOne(
          { _id: artist._id },
          { $inc: { searchCount: 1 } }
        );
      });

      const albumUpdates = albums.map(async (album) => {
        await Album.updateOne({ _id: album._id }, { $inc: { searchCount: 1 } });
      });

      const songUpdates = songs.map(async (song) => {
        await Song.updateOne({ _id: song._id }, { $inc: { searchCount: 1 } });
      });
      await Promise.all([...artistUpdates, ...albumUpdates, ...songUpdates]);
    }

    // const topArtists = await Artist.find({})
    //   .sort({ searchCount: -1 })
    //   .limit(ARTIST_LIMIT)
    //   .exec();

    // const topSongs = await Song.find({})
    //   .sort({ searchCount: -1 })
    //   .limit(LIMIT)
    //   .exec();
    // , topArtists, topSongs

    res.status(201).json({ artists, songs, albums });
  } catch {
    res.status(201).json();
  }
});
module.exports = router;
