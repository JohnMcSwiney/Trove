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

  const playlist = await Playlist.findById(id);

  if (!playlist) {

    return res.status(404).json({ err: "No such playlist" });

  }
  res.status(200).json(playlist)

}

//create a new playlist
const createPlaylist = async (req, res) => {

  console.log(req.body);

  try {
    
    const user = await User.findOne({displayName: req.body.user});

    console.log(user);

    if (!user) {

      throw new Error("User not found");
    }

    // const songs = await Song.find({}).sort({createdAt: -1});

    // if (!songs) {

    //   throw new Error("Songs not found");
    // }

    const playlist = new Playlist ({
      ...req.body,
      user: user._id
      //songs: songs._id
    });

    playlist.songList = [];

    res.status(201).json(playlist);

  } catch (err) {

    console.log(err);

    res.status(400).json({message: err.message});
  }
}
//update a new pl

const updatePlaylist = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'No such playlist' })
  }

  const playlist = await Playlist.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!playlist) {
    return res.status(404).json({ err: 'No such playlist' })
  }
  res.status(200).json(playlist);
}
//Delete a pl
const deletePlaylist = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'No such playlist' })
  }

  const playlist = await Playlist.findOneAndDelete({ _id: id })

  if (!playlist) {
    return res.status(404).json({ err: 'No such playlist' })
  }
  res.status(200).json(playlist);
}

module.exports = {
  getAllPlaylist,
  getAPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist
}