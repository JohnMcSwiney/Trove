const mongoose = require("mongoose");
const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");

const getAllAlbum = async (req, res) => {
  const albums = await Album.find({}).sort({ createdAt: -1 });
  res.status(200).json(albums);
};

const getAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ err: "No such Album" });
  }

  const album = await Album.findById(id)
    .populate({
      path: "artist",
      select: "-password -email -dob -gender", // Exclude password and email fields
    })
    .populate({
      path: "songList",
      populate: {
        path: "artist",
        select: "artistName",
      },
    })

    .populate({
      path: "songList",
      populate: {
        path: "featuredArtists",
        select: "artistName",
      },
    })
    .sort({ createdAt: -1 });

  if (!album) {
    return res.status(400).json({ err: "No such Album" });
  }

  await Album.findOneAndUpdate(
    { _id: album._id },
    { $inc: { searchCount: 1 } }
  );

  res.status(200).json(album);
};

const getArtistAlbum = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Album is not available" });
  }

  const albums = await Album.find({ artist: id })
    .populate({
      path: "artist",
      select: "-password -email -dob; -gender", // Exclude password and email fields
    })
    .populate({
      path: "songList",
      populate: {
        path: "artist",
        select: "-password -email -dob -gender",
      },
    })

    .populate({
      path: "songList",
      populate: {
        path: "featuredArtists",
        select: "-password -email -dob -gender",
      },
    })
    .sort({ createdAt: -1 });
  if (!albums) {
    return res.status(404).json({ error: "You don't have any song" });
  }
  res.status(200).json(albums);
};

module.exports = {
  getAlbum,
  getAllAlbum,
  getArtistAlbum,
};
