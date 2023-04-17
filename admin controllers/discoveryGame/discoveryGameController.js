const express = require("express");
const { default: mongoose } = require("mongoose");
const URL = require("url").URL;
const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");
const User = require("../../models/user model/user-model");
const { getAllSongs } = require("../../admin controllers/song/songController");
const { resolve } = require("path");

const compareSongData = async (user) => {
  try {
    console.log("user liked songs: " + user.likedSongs);

    console.log("user liked songs length: " + user.likedSongs.length);

    let numOfPop = 0;
    let numOfRock = 0;
    let numOfCountry = 0;
    let numOfHipHop = 0;

    let songGenre = "";

    const songs = await Song.find({ _id: { $in: user.likedSongs } }).sort({
      genre: -1,
    });

    songs.map(async (song) => {
      console.log("songID: " + song._id);

      if (!mongoose.Types.ObjectId.isValid(song._id)) {
        return res.status(404).json({ err: "No such song" });
      }

      if (!song || song == null) {
        console.log("SongID is null: " + song._id);

        await User.updateOne(
          { _id: user._id },
          { $pull: { likedSongs: song._id } }
        );
        console.log("SongID should be removed");
      }

      // if (song.songUrl) {
      //   console.log("inside url validation")
      //   try {
      //     console.log("if url is valid")
      //     new URL(currentSong.songUrl);
      //   } catch (err) {
      //     console.log("Invalid songUrl, contents not found");

      //     await Song.updateOne(
      //       { _id: currentSong._id },
      //       { $set: { isPublished: false } }
      //     );
      //     console.log("Song should be disabled.");
      //   }
      // }

      console.log("currentSong title: " + song.title);

      console.log("currentSongGenre: " + song.genre);

      if (!song.genre || song.genre == null) {
        await Song.updateOne(
          { _id: song._id },
          { $set: { isPublished: false } }
        );
        console.log("song did not contain a genre");
        //throw new Error("SongGenre not found");
      }

      switch (song.genre) {
        case "pop":
          numOfPop++;
          console.log("popValue: " + numOfPop);
          break;
        case "rock":
          numOfRock++;
          console.log("rockValue: " + numOfRock);
          break;
        case "country":
          numOfCountry++;
          console.log("countryValue: " + numOfCountry);
          break;
        case "hiphop":
          numOfHipHop++;
          console.log("hipHopValue: " + numOfHipHop);
          break;
        default:
          console.log("Invalid songGenre");
          break;
      }
    });


    console.log("final # of pop: " + numOfPop);
    console.log("final # of rock: " + numOfRock);
    console.log("final # of country: " + numOfCountry);
    console.log("final # of hiphop: " + numOfHipHop);

    const genres = ["pop", "rock", "country", "hiphop"];

    const genreObjects = [];

    while (genreObjects < 4) {
      genreObjects.push({ genre: genres[0], value: numOfPop, tried: false });
      genreObjects.push({ genre: genres[1], value: numOfRock, tried: false });
      genreObjects.push({
        genre: genres[2],
        value: numOfCountry,
        tried: false,
      });
      genreObjects.push({ genre: genres[3], value: numOfHipHop, tried: false });
    }

    genreObjects.map((obj) => {
      console.log(
        "genre before sort: " + obj.genre + ", value before sort: " + obj.value
      );
    });

    genreObjects.sort(function (a, b) {
      return b.value - a.value;
    });

    genreObjects.map((obj) => {
      console.log(
        "genre after sort: " + obj.genre + ", value after sort: " + obj.value
      );
    });

    console.log("genreObjects length: " + genreObjects.length);

    let chance = Math.round(Math.random() * 501);

    console.log("chance in genre validation: " + chance);

    if (
      genreObjects[0].value == genreObjects[1].value ||
      genreObjects[0].value == genreObjects[2].value ||
      genreObjects[0].value == genreObjects[3].value
    ) {
      console.log(
        "if there are two or more number of genres that are the same"
      );
      if (chance >= 100 && chance < 200) {
        console.log("chance was >= 100 but < 200");
        songGenre = genreObjects[0].genre;
      } else if (chance > 200 && chance < 300) {
        console.log("chance was > 200 but < 300");
        songGenre = genreObjects[1].genre;
      } else if (chance > 300) {
        console.log("chance was > 300");
        songGenre = genreObjects[2].genre;
      } else {
        console.log("chance was < 100");
        songGenre = genreObjects[3].genre;
      }
    }

    //assign genre in set of final if statements
    if (chance >= 100 && chance < 200) {
      console.log("chance was >= 100 but < 200");
      songGenre = genreObjects[0].genre;
    } else if (chance > 200 && chance < 300) {
      console.log("chance was > 200 but < 300");
      songGenre = genreObjects[1].genre;
    } else if (chance >= 300) {
      console.log("chance was >= 300");
      songGenre = genreObjects[2].genre;
    } else {
      console.log("chance was < 100");
      songGenre = genreObjects[3].genre;
    }
    //return songGenre;

    console.log("bdksadjsabdbdsabsa");

    console.log("songGenre after random shuffler: " + songGenre);

    let similarSongs = [];

    similarSongs = await Song.find({ genre: songGenre })
      .populate("artist")
      .populate("featuredArtists")
      .populate("album")
      .sort();

    console.log("similarSongs length: " + similarSongs.length);

    if (!similarSongs || similarSongs.length === 0) {
      console.log("it did not find similar songs with current genre");
      console.log("searching other genres");

      for (let i = 0; i < genreObjects.length; i++) {
        if (!genreObjects[i].tried) {
          songGenre = genreObjects[i].genre;
          genreObjects[i].tried = true;

          console.log(
            "check if songGenre from random event contains songs: " + songGenre
          );

          similarSongs = await Song.find({ genre: songGenre })
            .populate("artist")
            .populate("featuredArtists")
            .populate("album")
            .sort();
        }
        break;
      }
    }

    if (similarSongs.length < 5 && similarSongs.length > 0) {
      console.log("this genre has less than 5 songs, give user random songs.");
      return randomSong(user);
    }

    if (similarSongs.length === 5) {
      console.log(
        "similarSongs only has 5 songs, so we're returning it to the outer function."
      );
      return similarSongs;
    }

    console.log("should be out of for loop after finding similarSongs");
    // else {
    //   console.log("if that didn't work just give them random songs")
    //   return randomSong(user);
    // }

    similarSongs.map((song) => {
      console.log(
        "song title in similarSongs: " + song.title + ", genre: " + song.genre
      );
    });
    //else {}

    const songLimit = [];

    while (songLimit.length < 5) {
      // const index = Math.floor(Math.random() * uniqueSongs.length);
      // const randomSimilarSong = uniqueSongs[index];
      const randomSimilarSong =
        similarSongs[Math.floor(Math.random() * similarSongs.length)];

      //console.log("randomSong in for loop: " + randomSimilarSong);

      if (!randomSimilarSong) {
        console.log("randomSong not found");
      }

      if (
        !songLimit.some((song) => song._id === randomSimilarSong._id) &&
        !user.likedSongs.includes(randomSimilarSong._id)
      ) {
        songLimit.push(randomSimilarSong);
        console.log(
          "added randomSong: " +
          randomSimilarSong.title +
          ", randomSong genre: " +
          randomSimilarSong.genre
        );
      }
    }

    songLimit.map((song) => {
      console.log(
        "song title in songlimit: " + song.title + ", genre: " + song.genre
      );
    });

    console.log("songLimit length: " + songLimit.length);

    if (songLimit.length > 5) {
      throw new Error("Song limit cannot be greater than 5.");
    }

    return songLimit;
  } catch (err) {
    console.log(err);
    throw new Error("Error with fetching songs");
  }
};

const randomSong = async (user) => {
  const songs = await Song.find()
    .populate("artist")
    .populate("featuredArtists")
    .populate("album")
    .sort();

  if (!songs) {
    return res.status(404).send("songs not found");
  }


  const songLimit = [];

  while (songLimit.length < 5) {

    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    if (!randomSong) {
      console.log("randomSong not found");
    }

    if (
      !songLimit.some((song) => song._id === randomSong._id) &&
      !user.likedSongs.includes(randomSong._id)
    ) {
      songLimit.push(randomSong);
      console.log(
        "added randomSong: " +
        randomSong.title +
        ", randomSong genre: " +
        randomSong.genre
      );
    }

  }
  console.log("songLimit length: " + songLimit.length);

  if (songLimit.length > 5) {
    throw new Error("Song limit cannot be greater than 5.");
  }

  return songLimit;
};

//get discovery game
const loadDiscoveryGame = async (req, res) => {
  //what should happen is when the game is loaded it'll just load a random song from the list.

  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User profile not found");
    }

    if (user.likedSongs.length == 0) {
      console.log("user has no liked songs at the moment");
      const differentSongsLimit = await randomSong(user);
      res.status(200).json(differentSongsLimit);
    } else {
      let chance = Math.round(Math.random() * 101);

      console.log("chance in outer function: " + chance);

      if (chance >= 50) {
        console.log("chance was higher or equal than 25");
        const similarSongsLimit = await compareSongData(user);
        res.status(200).json(similarSongsLimit);
      } else {
        console.log("chance was less than or equal 25");
        const differentSongsLimit = await randomSong(user);
        res.status(200).json(differentSongsLimit);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "could not load discovery game" });
  }
};

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

    console.log("swipe direction test: " + req.body.likedSongs);

    const songArray = await Promise.all(
      req.body.likedSongs.map(async (currentSong, i = 0) => {
        const song = await Song.findById(currentSong._id);

        if (!song) {
          res.status(404).json({ error: "Featured artist not found" });
        }

        console.log("song: " + song);

        if (
          !req.body.likedSongs[i].direction ||
          req.body.likedSongs[i].direction == null
        ) {
          console.log("swipeDirection not found");
        } else {
          console.log("swipeDirection[i]: " + req.body.likedSongs[i].direction);

          if (req.body.likedSongs[i].direction === "dislike") {
            console.log("they swiped left");
            //res.status(200).json(songLimit)
            i++;
          } else {
            //user.likedSongs.push(song._id);
            await User.updateOne(
              { _id: user._id },
              { $push: { likedSongs: song._id } }
            );

            await Song.updateOne(
              {_id: song._id},
              {$push: {isLoved: user._id}}
            );
            console.log("liked successfully");
            //res.status(200).json(songLimit);
            i++;
          }
        }
      })
    );
    console.log("done");
    res.status(200).json({ msg: "successfully ran DG" });
  } catch (err) {
    console.log("fetching song err");
    console.log(err);
  }
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
