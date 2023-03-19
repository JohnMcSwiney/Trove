const express = require("express");
const mongoose = require("mongoose");
const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");
const User = require("../../models/user model/user-model");

//mongoose.connection().artists.getIndexes()

//get all artists
const getAllArtist = async (req, res) => {
  const artists = await Artist.find({})
    .populate("songList", "title songUrl genre")
    .populate("albumList")
    // .populate('albumList')
    .sort({ createAt: -1 });
  res.status(200).json(artists);
};

//get an artist
const getAnArtist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such artist" });
  }

  const artist = await Artist.findById(id)
    .populate("songList")
    .populate("albumList");
  if (!artist) {
    return res.status(404).json({ error: error.message });
  }
  await Artist.findOneAndUpdate( { _id: artist._id },{ $inc: { searchCount: 1 } })
  res.status(200).json(artist);
};

//create an artist
const createArtist = async (req, res) => {
  try {
    const artist = new Artist(req.body);
    artist.songList = [];
    artist.albumList = [];

    await artist.save();

    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

//update an artist
const updateArtist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such artist" });
  }

  const artist = await Artist.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!artist) {
    return res.status(404).json({ message: err.message });
  }

  res.status(200).json(artist);
};

//
const deleteArtist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such artist" });
  }

  const artist = await Artist.findOneAndDelete({ _id: id });

  if (!artist) {
    return res.status(404).json({ message: "Artist's not found" });
  }

  res.status(200).json(artist);
}

const likedArtist = async (req, res) => {

  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "song not available" });
  }

  try {
    const artist = await Artist.findOne({_id: id});

    if (!artist) {
      console.log("artist not found");

      throw new Error("artist not found");
    }

    const {userID} = req.body;
    console.log(userID);

    const user = await User.findOne({_id: userID});

    if (!user) {
      console.log("user not found");

      throw new Error("user not found");
    }

    if (artist.followers.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "Artist has already been liked by the user" });
    }

    artist.followers.push(user._id);
    artist.artistFollowers++;
    user.likedArtists.push(artist._id);

    await artist.save();
    await user.save();

  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

const dislikeArtist = async (req, res) => {

  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "artist not available" });
  }

  try {
    const artist = await Artist.findOne({_id: id});

    if (!artist) {
      console.log("artist not found");

      throw new Error("artist not found");
    }

    const {userID} = req.body;
    console.log(userID);

    const user = await User.findOne({_id: userID});

    if (!user) {
      console.log("user not found");

      throw new Error("user not found");
    }

    if (artist.followers.includes(user._id)) {
      artist.followers.pop(user._id);
      artist.followers--;
      user.likedArtists.pop(artist._id);
    }

    await artist.save();

    await user.save();

    res.status(200).json({ message: "removed like successfully" });

  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getAllArtist,
  getAnArtist,
  createArtist,
  updateArtist,
  deleteArtist,
  likedArtist,
  dislikeArtist
};
