const express = require("express");
const { default: mongoose } = require("mongoose");
const AudioContext = require("web-audio-api").AudioContext;
const AudioBuffer = require("web-audio-api").AudioBuffer;
// const AudioContext = require("web-audio-engine").StreamAudioContext;
// const wae = require("web-audio-engine");
const MusicTempo = require("music-tempo");
const fs = require("fs");
const DiscoveryGame = require("../../models/discoveryGame model/discoveryGame-model");
const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");
const User = require("../../models/user model/user-model");
const {getAllSongs} = require("../../admin controllers/song/songController");
// const { storage } = require("firebase/compat/storage");


// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//get discovery game
const getDiscoveryGame = async (req, res) => {
  //what should happen is when the game is loaded it'll just load a random song from the list.

  try {

    // const user = await User.findOne({ email: req.body.email });

    // if (!user) {
    //   return res.status(404).send("User profile not found");
    // }
  
    // console.log(user);

    const songs = await Song.find()

    .populate("artist")
    .populate("featuredArtists")

    .populate("album")

    .sort({ createdAt: -1 });

    if (!songs) {
      return res.status(404).send("songs not found");
    }

    const oneSong = songs[Math.floor(Math.random() * songs.length)];

    console.log("oneSong: " + oneSong);

  console.log("getAllSongs method working");

  //res.status(200).json(songs);
  res.status(200).json(oneSong);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "fetching songs failed" });
  }
 
}

//WIP
const loadDiscoveryGame = async (req, res) => {

  console.log("swipe direction: " + req.body.swipeDirection);


  try {

    const calcTempo = async (buffer) => {

      console.log("inside calctempo");
  
      let audioData = [];
  
      console.log("buffer: " + buffer);
  
      if (buffer.numberOfChannels == 2) {
  
        let data1 = buffer.getChannelData(0);
        let data2 = buffer.getChannelData(1);
  
        for (let i = 0; i < data1.length; i++) {
          audioData[i] = (data1[i] + data2[i]) / 2;
        }
      } else {
        audioData = buffer.getChannelData(0);
      }
  
      const songData = new MusicTempo(audioData);

      return songData;
  
      // console.log("tempo: " + songData.tempo);
      // console.log("beats: " + songData.beats);
  
    }


    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("User profile not found");
    }
  
    console.log(user);
  
    const song = await Song.findOne({ _id: req.body.songID });
  
    if (!song) {
      return res.status(404).send("Song not found");
    }

    const songURL = song.songUrl;

    await fetch(songURL)
      .then(res => res.arrayBuffer())
      .then(buffer => {

        const context = new AudioContext();

        const musicData = context.decodeAudioData(buffer, calcTempo);

        return musicData;
      });

    if (!req.body.swipeDirection || req.body.swipeDirection == null) {

      console.log("swipeDirection not found");
    }
    else {

      if (req.body.swipeDirection  === "left") {
        console.log("they swiped left");
        // const nextSong = await getNextSong(user);
        // res.send(nextSong);

        // async function getNextSong(user) {
        //   user = await User.findById(user).populate({
        //     path: "user.likedSongs",
        //     options: { sort: { createdAt: -1 } },
        //     limit: 1,
        //   });
        // }
      } else {
        console.log("before push");
        user.likedSongs.push(song._id);
        console.log("liked successfully");
      }
    }

  } catch (err) {
    console.log("fetching song err");
    console.log(err);
  }


  // const lastlikedSong = user.likedSongs[0];

  // const similarSongs = await Song.find({
  //     $and: [
  //         { _id: { $ne: lastlikedSong._id } },
  //         { genre: lastlikedSong.genre },
  //         { 'similarity.beat': { $gte: lastlikedSong.songData.beat - 0.1, $lte: lastlikedSong.similarity.beat + 0.1 } },
  //         { 'similarity.tempo': { $gte: lastlikedSong.similarity.tempo - 5, $lte: lastlikedSong.similarity.tempo + 5 } }
  //     ]
  // }).limit(10);

  // const nextSong = similarSongs[Math.floor(Math.random() * similarSongs.length)];
  // return nextSong;

  // const { songId, direction } = req.body;

  // try {

  //     const user = await User.findOne({
  //         userOwner: req.user._id
  //     });

  //     const existingSwipe = user.swipes.find(swipe => swipe.song === songId);

  //     if (existingSwipe) {
  //         return res.status(400).json({ msg: 'already swiped on this song' });
  //     }

  //     user.swipes.push({ song: songId, direction });

  //     await user.save();

  //     const discoveryGame = await DiscoveryGame.findOne({ songList: songId });

  //     if (discoveryGame) {
  //         if (direction === 'like' || 'right') {

  //             discoveryGame.swipes.set(songId, 'like');
  //         }
  //         else if (direction === 'dislike' || 'left') {

  //             discoveryGame.swipes.set(songId, 'dislike');
  //         }

  //         await discoveryGame.save();

  //         // const swipe = user.swipes.find(
  //         //     swipe => swipe.song.toString() === songId
  //         // );

  //         // if (swipe) {
  //         //     return res.status(400).json({ msg: 'alread swiped on this song' });
  //         // }

  //         // user.swipes.push({ song: songId, direction });
  //         // await user.save();

  //         // await DiscoveryGame.updateOne(
  //         //     { _id: songId },
  //         //     { $inc: { [`swipeCount.${direction}`]: 1 } }
  //         // );
  //     }
  //     res.status(200).send('swiped');
  // } catch (err) {

  //     console.log(err);
  //     res.status(500).send('server error');
  // }

  // const audioContext = new AudioContext();

  // const response = await fetch(song);
  // const songData = await response.arrayBuffer();
  // const songBuffer = await audioContext.decodeAudioData(songData);

  // const beatDetector = new BeatDetector(audioContext);
  // const source = audioContext.createBufferSource();
  // source.buffer = songBuffer;
  // source.connect(beatDetector);
  // beatDetector.connect(audioContext.destination);

  // const tempo = await beatDetector.getTempo();
  // const beat = await beatDetector.getBeat();

  // const nextSong = await getNextSong(user);
  // res.send(nextSong);

  // async function getNextSong(user) {

  //     const user = await User.findById(user).populate({
  //         path: 'user.likedSongs',
  //         options: {sort: {createdAt: -1}},
  //         limit: 1
  //     });
  // }
};

//update an artist
const updateDiscoveryGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such song" });
  }

  const song = await Song.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!song) {
    return res.status(404).json({ message: err.message });
  }

  res.status(200).json(song);
};

//
const deleteFromDiscoveryGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such song" });
  }

  const song = await Song.findOneAndDelete({ _id: id });

  if (!song) {
    return res.status(404).json({ message: "Song not found" });
  }

  res.status(200).json(song);
};

module.exports = {
  getDiscoveryGame,
  loadDiscoveryGame,
  updateDiscoveryGame,
  deleteFromDiscoveryGame,
};
