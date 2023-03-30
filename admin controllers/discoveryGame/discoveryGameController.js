const express = require("express");
const { default: mongoose } = require("mongoose");
const AudioContext = require("web-audio-api").AudioContext;
const AudioBuffer = require("web-audio-api").AudioBuffer;
const MusicTempo = require("music-tempo");
const av = require("av");
const fs = require("fs");
const DiscoveryGame = require("../../models/discoveryGame model/discoveryGame-model");
const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");
const User = require("../../models/user model/user-model");
const { getAllSongs } = require("../../admin controllers/song/songController");
const { resolve } = require("path");
// const { storage } = require("firebase/compat/storage");

const errorCallback = (err) => {
  console.log(err);
  throw new Error("decoding audio error");
}
//find beat and tempo of a song.
const calcSongData = async (decodedAudioData) => {

  return new Promise((resolve, reject) => {

    console.log("should be in calcsongdata");

    console.log("audiodata in calcsongdata" + decodedAudioData);

    let audioData = [];

    if (decodedAudioData.numberOfChannels == 2) {

      let data1 = decodedAudioData.getChannelData(0);
      let data2 = decodedAudioData.getChannelData(1);

      for (let i = 0; i < data1.length; i++) {
        audioData[i] = (data1[i] + data2[i]) / 2;
      }
    } else {
      audioData = decodedAudioData.getChannelData(0);
    }

    const songData = new MusicTempo(audioData);

    console.log("tempo resolve: " + Math.round(songData.tempo));
    console.log("beat resolve: " + Math.round(songData.beatInterval));

    resolve(songData);
  })
    // .then((result) => {
    //   console.log("result: " + result);
    //   return result;
    // })
    .catch((err) => {
      console.log(err);
      reject(err);
      throw new Error("error in calcSongData");
    });
}

const fetchAudioData = async (songUrl) => {

  const res = await fetch(songUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch response");
  }

  const buffer = await res.arrayBuffer();

  console.log("buffer" + buffer);

  const context = new AudioContext();

  // const decodedBuffer = await new Promise((resolve, reject) => {
  //   context.decodeAudioData(buffer, resolve, reject);
  // });

  const decodedBuffer = await context.decodeAudioData(buffer);
  // const channelData = decodedBuffer.getChannelData(0);
  // const audioData = new Float32Array(channelData);

  //return audioData;
  return decodedBuffer;

}

const compareSongData = async (user) => {

  try {

    console.log("user liked songs: " + user.likedSongs);

    console.log("user liked songs length: " + user.likedSongs.length);

    for (const songId of user.likedSongs) {

      console.log("songID: " + songId);

      if (!mongoose.Types.ObjectId.isValid(songId)) {
        return res.status(404).json({ err: "No such song" });
      }

      const currentSong = await Song.findById(songId);

      if (!currentSong || currentSong == null) {

        console.log("SongID is null: " + songId);

        await User.updateOne(
          { _id: user._id },
          { $pull: { likedSongs: songId } }
        );
        console.log("SongID should be removed");
      }

      console.log("currentSong title: " + currentSong.title);

      const songURL = currentSong.songUrl;

      console.log("songurl in compareSongData: " + songURL);

      if (!songURL) {
        await User.updateOne(
          { _id: user._id },
          { $pull: { likedSongs: songId } }
        );

        console.log("SongID should be removed");
        throw new Error("SongURL does not exist");
      }

      const decodedAudioData = await fetchAudioData(songURL);

      // const context = new AudioContext();

      // const decodedBuffer = await new Promise((resolve, reject) => {
      //   context.decodeAudioData(buffer, resolve, reject);
      // });

      const songData = await calcSongData(decodedAudioData);

      console.log("songData in outer function: " + songData);

      // let tempoList = [];
      // let beatList = [];

      // const songTempo = tempo;
      // const songBeat = beatInterval;

      // // const songTempo = Math.round(calcSongData.tempo).toFixed(2);
      // // const songBeat = Math.round(calcSongData.beat).toFixed(2);

      // console.log("songTempo: " + songTempo);
      // console.log("songBeat: " + songBeat);


      // tempoList.push(songTempo);
      // beatList.push(songBeat);

      // let tempoValue = 0;
      // let beatValue = 0;

      // for (let i = 0; i < tempoList.length; i++) {
      //   tempoValue += tempoList[i];
      //   console.log("current tempoValue: " + tempoValue);
      // }

      // for (let i = 0; i < beatList.length; i++) {
      //   beatValue += beatList[i];
      //   console.log("current beatValue: " + beatValue);

      // }

      // const averageTempo = Math.round(tempoValue / user.likedSongs.length).toPrecision(2);

      // const averageBeat = Math.round(beatValue / user.likedSongs.length).toPrecision(2);

      // console.log("average tempo of user liked songs: " + averageTempo);

      // console.log("average beat of user liked songs: " + averageBeat);

      // return averageTempo, averageBeat;
    }

    // await user.likedSongs.forEach(async (songId) => {

    //   console.log("songID: " + songId);

    //   if (!mongoose.Types.ObjectId.isValid(songId)) {
    //     return res.status(404).json({ err: "No such song" });
    //   }

    //   const currentSong = await Song.findById(songId);

    //   if (!currentSong || currentSong == null) {
    //     console.log("SongID is null: " + songId);

    //     await User.updateOne(
    //       { _id: user._id },
    //       { $pull: { likedSongs: songId } }
    //     );
    //     console.log("SongID should be removed");
    //   }

    //   console.log("currentSong title: " + currentSong.title);

    //   const songURL = currentSong.songUrl;

    //   console.log("songurl in compareSongData: " + songURL);

    //   //await fetchSong(songURL);

    //   const res = await fetch(songURL);

    //   const buffer = await res.arrayBuffer();

    //   const context = new AudioContext();

    //   context.decodeAudioData(buffer, calcSongData, errorCallback);

    //   let tempoList = [];
    //   let beatList = [];

    //   const songTempo = Math.round(calcSongData.tempo).toFixed(2);
    //   const songBeat = Math.round(calcSongData.beat).toFixed(2);

    //   console.log("songTempo: " + songTempo);
    //   console.log("songBeat: " + songBeat);


    //   tempoList.push(songTempo);
    //   beatList.push(songBeat);

    //   let tempoValue = 0;
    //   let beatValue = 0;

    //   for (let i = 0; i < tempoList.length; i++) {
    //     tempoValue += tempoList[i];
    //     console.log("current tempoValue: " + tempoValue);
    //   }

    //   for (let i = 0; i < beatList.length; i++) {
    //     beatValue += beatList[i];
    //     console.log("current beatValue: " + beatValue);

    //   }

    //   const averageTempo = Math.round(tempoValue / user.likedSongs.length).toPrecision(2);

    //   const averageBeat = Math.round(beatValue / user.likedSongs.length).toPrecision(2);

    //   console.log("average tempo of user liked songs: " + averageTempo);

    //   console.log("average beat of user liked songs: " + averageBeat);

    //   return averageTempo, averageBeat;

    //   // await fetch(songURL)
    //   //   .then(res => res.arrayBuffer())
    //   //   .then(async (buffer) => {

    //   //     console.log("inside fetch songURL");

    //   //     console.log("buffer: " + buffer);

    //   //     const context = new AudioContext();

    //   //     await calcSongData();

    //   //     console.log("calcSongData value: " + calcSongData.tempo);

    //   //     return context.decodeAudioData(buffer);

    //   // let tempoList = [];
    //   // let beatList = [];

    //   // const songTempo = Math.round(calcTempo.tempo).toFixed(2);
    //   // const songBeat = Math.round(calcTempo.beat).toFixed(2);

    //   // console.log("songTempo: " + songTempo);
    //   // console.log("songBeat: " + songBeat);


    //   // tempoList.push(songTempo);
    //   // beatList.push(songBeat);

    //   // let tempoValue = 0;
    //   // let beatValue = 0;

    //   // for (let i = 0; i < tempoList.length; i++) {
    //   //   tempoValue += tempoList[i];
    //   //   console.log("current tempoValue: " + tempoValue);
    //   // }

    //   // for (let i = 0; i < beatList.length; i++) {
    //   //   beatValue += beatList[i];
    //   //   console.log("current beatValue: " + beatValue);

    //   // }

    //   // const averageTempo = Math.round(tempoValue / user.likedSongs.length).toPrecision(2);

    //   // const averageBeat = Math.round(beatValue / user.likedSongs.length).toPrecision(2);

    //   // console.log("average tempo of user liked songs: " + averageTempo);

    //   // console.log("average beat of user liked songs: " + averageBeat);

    //   // return averageTempo, averageBeat;

    //   //   });
    // });

    // let tempoList = [];
    // let beatList = [];

    // const songTempo = Math.round(calcTempo.tempo).toFixed(2);
    // const songBeat = Math.round(calcTempo.beat).toFixed(2);

    // tempoList.push(songTempo);
    // beatList.push(songBeat);

    // let tempoValue = 0;
    // let beatValue = 0;

    // for (let i = 0; i < tempoList.length; i++) {
    //   tempoValue += tempoList[i];
    // }

    // for (let i = 0; i < beatList.length; i++) {
    //   beatValue += beatList[i];
    // }

    // const averageTempo = Math.round(tempoValue / user.likedSongs.length).toPrecision(2);

    // const averageBeat = Math.round(beatValue / user.likedSongs.length).toPrecision(2);

    // console.log("average tempo of user liked songs: " + averageTempo);

    // console.log("average beat of user liked songs: " + averageBeat);

    // return averageTempo, averageBeat;

  } catch (err) {
    console.log(err);
    throw new Error("tempo and beat validation failed");
  }

}

const loadSongs = async (user) => {

  const songData = await compareSongData(user);

  console.log("should be done finding songdata");

  // const allSongs = await Song.find()

  //   .populate("artist")
  //   .populate("featuredArtists")

  //   .populate("album")

  //    .sort({createdAt: -1});

  // if (!allSongs) {
  //   return res.status(404).send("songs not found");
  // }

  // let similarSongs = [];

  // for (const song of allSongs) {

  //   console.log("song in allSongs: " + song.title);

  //   const songURL = song.songUrl;

  //   console.log("songURL in allSongs: " + songURL);

  //   await fetch(songURL)
  //     .then(res => res.arrayBuffer())
  //     .then(buffer => {

  //       const context = new AudioContext();

  //       return context.decodeAudioData(buffer, calcSongData);
  //     });

  //   const songTempo = Math.round(calcSongData.tempo).toPrecision(2);
  //   const songBeat = Math.round(calcSongData.beat).toPrecision(2);

  //   if (songTempo == findSongData.averageTempo && songBeat == averageBeat) {
  //     similarSongs.push(song);
  //   }
  // }

  // for (let i = 0; i < 5; i++) {
  //   const randomSong = similarSongs[Math.floor(Math.random() * similarSongs.length)];
  //   songLimit[i] = randomSong;
  //   console.log("songlimit title: " + songLimit[i].title);
  // }

  // console.log("songLimit length: " + songLimit.length)

  // if (songLimit.length > 5) {
  //   throw new Error("Song limit cannot be greater than 5.");
  // }

  // return songLimit;

  // res.status(200).json(songLimit);
}

//get discovery game
const loadDiscoveryGame = async (req, res) => {
  //what should happen is when the game is loaded it'll just load a random song from the list.

  const { id } = req.params;

  try {

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User profile not found");
    }

    //console.log(user);

    if (user.likedSongs.length == 0) {

      const songs = await Song.find()

        .populate("artist")
        .populate("featuredArtists")

        .populate("album")

        .sort({ createdAt: -1 });

      if (!songs) {
        return res.status(404).send("songs not found");
      }

      const songLimit = [];

      while (songLimit.length < 5) {

        const randomSong = songs[Math.floor(Math.random() * songs.length)];

        if (!songLimit.includes(randomSong)) {
          songLimit.push(randomSong);
          console.log("added randomSong: " + randomSong.title);
        }
      }
      console.log("songLimit length: " + songLimit.length)

      if (songLimit.length > 5) {
        throw new Error("Song limit cannot be greater than 5.");
      }

      res.status(200).json(songLimit);

    }
    else {

      const songLimit = await loadSongs(user);

      res.status(200).json(songLimit);
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "could not load discovery game" });
  }

}

//WIP
const playDiscoveryGame = async (req, res) => {

  const { id } = req.params;

  console.log("swipe direction: " + req.body);

  try {

    // const user = await User.findOne({ email: req.body.email });

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User profile not found");
    }

  //   const songs = await Song.find()

  //   .populate("artist")
  //   .populate("featuredArtists")

  //   .populate("album")

  //   .sort({ createdAt: -1 });

  // if (!songs) {
  //   return res.status(404).send("songs not found");
  // }

  // let songLimit = [];


  // for (let i = 0; i < 5; i++) {
  //   const randomSong = songs[Math.floor(Math.random() * songs.length)];

  //   // if (songLimit[i] == randomSong) {
  //   //   songLimit[i + 1];
  //   // }
  //   songLimit[i] = randomSong;
  //   console.log("songlimit title: " + songLimit[i].title);
  // }

  // console.log("songLimit length: " + songLimit.length)

  // if (songLimit.length > 5) {
  //   throw new Error("Song limit cannot be greater than 5.");
  // }

  // res.status(200).json(songLimit);

    console.log("swipe direction test: " + req.body.songs);

    const songArray = await Promise.all(
      req.body.songs.map(async (currentSong, i = 0) => {
        const song = await Song.findById(currentSong._id);

        if (!song) {
          throw new Error("Featured artist not found");
        }

        console.log("song: " + song);

        if (!req.body.songs[i].swipeDirection || req.body.songs[i].swipeDirection == null) {

          console.log("swipeDirection not found");
        }
        else {

          console.log("swipeDirection[i]: " + req.body.songs[i].swipeDirection);

          if (req.body.songs[i].swipeDirection === "dislike") {
            console.log("they swiped left");
            res.status(200).json(songLimit)
            i++;

          } else {
            //user.likedSongs.push(song._id);
            await User.updateOne(
              { _id: user._id },
              { $push: { likedSongs: song._id } }
            );
            console.log("liked successfully");
            res.status(200).json(songLimit);
            i++;
          }
        }
      })
    );
    console.log("done");
    res.status(200).json({ msg: "successfully ran DG" });


    // const songURL = song.songUrl;

    // await fetch(songURL)
    //   .then(res => res.arrayBuffer())
    //   .then(buffer => {

    //     const context = new AudioContext();

    //     const musicData = context.decodeAudioData(buffer, calcTempo);

    //     return musicData;
    //   });

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
  loadDiscoveryGame,
  playDiscoveryGame,
  updateDiscoveryGame,
  deleteFromDiscoveryGame,
};
