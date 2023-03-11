const Playlist = require('../../models/playlist model/playlist-model');
const User = require('../../models/user model/user-model');
const Song = require('../../models/song model/song-model');

const mongoose = require('mongoose')
//get all playlist
const getAllPlaylist = async (req, res) => {

  const playlists = await Playlist.find({}).sort({ createdAt: -1 });

  res.status(200).json(playlists);
}


//get 1 pl
const getAPlaylist = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'No such playlist' })
  }

  const playlist = await Playlist.findById(id)
  .populate("playlistCreator", "displayName")

  console.log(playlist);

  if (!playlist) {
    return res.status(404).json({ err: "No such playlist" });
  }

  else {
    console.log(playlist);

    res.status(200).json(playlist)
  }

}

//create a new playlist
const createPlaylist = async (req, res) => {

  console.log(req.body);

  //const {id} = req.params;

  try {

    const user = await User.findOne({ displayName: req.body.playlistCreator });

    console.log(user);

    if (!user) {

      throw new Error("User not found");
    }


    const playlist = new Playlist({
      ...req.body,
      playlistCreator: user._id
    });

    playlist.songList = [];
    user.playlists.push(playlist._id);

    await playlist.save();
    await user.save();

    res.status(201).json(playlist);

  } catch (err) {

    console.log(err);

    res.status(400).json({ message: err.message });
  }
}
//update a new pl

const updatePlaylist = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'No such playlist' })
  }

  try {

    const playlist = await Playlist.findById(id);

    const user = await User.findOne({ _id: playlist.playlistCreator });

    if (!user) {
      console.log(user);
      throw new Error("User not found");
    }

    const songs = await Song.find({}).sort({ createdAt: -1 });

    if (!songs) {

      throw new Error("Songs not found");
    }

    let songList = songs.map(song => song._id);

    await Playlist.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body, playlistCreator: user._id, songList: songList._id } },
      { new: true }
    );

    //figure out how to remove songs...

    if (!playlist) {

      return res.status(404).json({ message: 'No such playlist' });

    }

    res.status(200).json(playlist);

  } catch (err) {

    console.log(err);
    res.status(400).json({ message: err.message });
  }
}
//Delete a pl
const deletePlaylist = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'No such playlist' })
  }

  try {

    const playlist = await Playlist.findById(id);

    const user = await User.findOne({ _id: playlist.playlistCreator });

    if (!user) {
      throw new Error("User not found");
    }

    await User.updateOne({ _id: user._id }, { $pull: { playlists: playlist._id } });

    await Playlist.findOneAndDelete({ _id: id });

    res.status(200).json({ msg: "playlist deleted" });

  } catch (err) {

    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getAllPlaylist,
  getAPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist
}