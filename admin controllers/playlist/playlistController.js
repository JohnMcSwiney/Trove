const Playlist = require("../../models/playlist model/playlist-model");
const User = require("../../models/user model/user-model");
const Song = require("../../models/song model/song-model");

const mongoose = require("mongoose");
//get all playlist
const getAllPlaylist = async (req, res) => {
  const playlists = await Playlist.find({}).sort({ createdAt: -1 });

  res.status(200).json(playlists);
};

//get 1 pl
const getAPlaylist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such playlist" });
  }

  const playlist = await Playlist.findById(id)
    .populate("playlistCreator")
    .populate({
      path: "songList",
      populate: {
        path: "artist",
        select: "artistName",
      },
    });
  if (!playlist) {
    return res.status(404).json({ err: "No such playlist" });
  } else {
    console.log(playlist);

    res.status(200).json(playlist);
  }
};

const getYourPlaylists = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This playlist doesn't not exist" });
  }
  const playlists = await Playlist.find({ playlistCreator: id }).sort({
    createdAt: -1,
  });

  res.status(200).json(playlists);
};

//create a new playlist
const createPlaylist = async (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  try {
    const user = await User.findOne({ _id: req.body.id });

    if (!user) {
      throw new Error("Please sign in to play this");
    }

    let songList = [];
    let song;

    if(req.body.songList) {
        for(i = 0; i < req.body.songList.length; i++) {
            song = await Song.findOne({ _id: req.body.songList[i]});
            songList = [...songList, song._id];
            console.log(songList)

        if (!song) {
          throw new Error("Please sign in to play this SONG");
        }
      
      }
  }

    const playlist = new Playlist({
      ...req.body,
      playlistCreator: user._id,
      songList: songList,
    });

    // playlist.songList = songList;
    user.playlists.push(playlist._id);

    await playlist.save();
    await user.save();

    res.status(201).json(playlist);
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: err.message });
  }
};

//update a new pl

const updatePlaylist = async (req, res) => {
  const { id } = req.params;

  console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such playlist" });
  }

  try {
    const playlist = await Playlist.findById(id);

    const user = await User.findOne({ _id: playlist.playlistCreator });

    if (!user) {
      console.log(user);
      throw new Error("User not found");
    }

    let songList = [];
    let song;

    for (i = 0; i < req.body.songList.length; i++) {
      song = await Song.findOne({ _id: req.body.songList[i] });
      songList = [...songList, song._id];
      console.log(songList);

      if (!song) {
        throw new Error("Please sign in to play this SONG");
      }
    }

    // const songs = await Song.find({}).sort({ createdAt: -1 });

    // if (!songs) {
    //   throw new Error("Songs not found");
    // }

    // let songList = songs.map((song) => song._id);

    const playlistUpdate = await Playlist.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...req.body,
          // playlistCreator: user._id,
          playlistName: req.body.playlistName,
          songList: songList,
        },
      },
      { new: true }
    );

    await playlistUpdate.save();
    //figure out how to remove songs...

    if (!playlistUpdate) {
      return res.status(404).json({ message: "No such playlist" });
    }

    res.status(200).json(playlistUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

//Delete a pl
const deletePlaylist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such playlist" });
  }

  try {
    const playlist = await Playlist.findById(id);

    const user = await User.findOne({ _id: playlist.playlistCreator });

    if (!user) {
      throw new Error("User not found");
    }

    await User.updateOne(
      { _id: user._id },
      { $pull: { playlists: playlist._id } }
    );

    await Playlist.findOneAndDelete({ _id: id });

    res.status(200).json({ msg: "playlist deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllPlaylist,
  getYourPlaylists,
  getAPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};
