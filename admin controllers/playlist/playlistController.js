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
    console.log("get function working");
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
  try {
    const user = await User.findById(req.body.id);

    console.log("user ID: " + req.body.id);

    if (!user) {
      throw new Error("Please sign in to play this");
    }

    let songList = [];
    let song;

    if (req.body.songList) {
      for (i = 0; i < req.body.songList.length; i++) {
        song = await Song.findOne({ _id: req.body.songList[i] });
        songList = [...songList, song._id];
        console.log(songList);

        if (!song) {
          res.status(404).json({ error: "Please sign in to play this SONG" });
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
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error.message });
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

    const user = await User.findById(req.body.creatorid);

    if (!user) {
      console.log(user);
      //throw new Error("User not found");
    }

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      console.log(playlist);
      //throw new Error("playlist not found");
    }

    //console.log("playlist name: " + playlist.playlistName + ", songs in playlist: " + playlist.songList);


    // if (!req.body.songList || req.body.songList.length === 0) {
    //   const songs = await Song.find({ _id: { $in: playlist.songList } })

    //   songs.map(song => {

    //     console.log("song in playlist: " + song.title);

    //     playlist.songList.pop(song._id);

    //   });

    //   console.log("song should be removed");
    // }
    
    const songListAlreadyExists = await playlist.songList.filter(
        (song) => req.body.songList.includes(song.id)
    );
    if (songListAlreadyExists.length > 0) {
        playlist.songList = songListAlreadyExists;
    } else {
        playlist.songList = req.body.songList;
    }
  

    // // playlist.songList = [];
    // for (const songId of req.body.songList) {

    //   console.log("song: " + songId);

    //   const currentSong = await Song.findById(songId);

    //   console.log("currentSong: " + currentSong);

      // if (playlist.songList.includes(currentSong._id)) {
      //   console.log("duplicate song found");

      //   //playlist.songList.pop(currentSong._id);
      //   await Playlist.updateOne(
      //     { _id: playlist._id },
      //     {
      //       $in: playlist.songList,
      //       $pull: { songList: currentSong._id }
      //     },
      //     { new: true }
      //   );
      //   alert("backend removed duplicate song");
      // }

      // if (playlist.songList.some(song => song.id === currentSong._id)) {
      //   playlist.songList.pop(currentSong._id);
      //   console.log("duplicate song removed");
      // }

    //   playlist.songList.push(currentSong);

    //   console.log("song should be added");
    // }


    console.log("playlist songList: " + playlist.songList);

    await Playlist.updateOne(
      { _id: playlist._id },
      {
        $set: {
          ...req.body,
          playlistCreator: user._id,
          playlistName: req.body.playlistName,
          songList: playlist.songList,
        },
      },
      { new: true }
    );

    await playlist.save();

    res.status(200).json(playlist);

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
