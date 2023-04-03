const express = require("express");
const { default: mongoose } = require("mongoose");
const URL = require("url").URL;
const DiscoveryGame = require("../../models/discoveryGame model/discoveryGame-model");
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


    user.likedSongs.forEach(async (songId) => {

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

      if (currentSong.songUrl) {
        console.log("inside url validation")
        try {
          console.log("if url is valid")
          new URL(currentSong.songUrl);
        } catch (err) {
          console.log("Invalid songUrl, contents not found");

          await Song.updateOne(
            { _id: currentSong._id },
            { $set: { isPublished: false } }
          );
          console.log("Song should be disabled.");
        }
      }

      console.log("currentSong title: " + currentSong.title);

      console.log("currentSongGenre: " + currentSong.genre);

      if (!currentSong.genre || currentSong.genre == null) {

        await Song.updateOne(
          { _id: currentSong._id },
          { $set: { isPublished: false } }
        );
        console.log("song did not contain a genre");
        //throw new Error("SongGenre not found");
      }

      switch (currentSong.genre) {
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

      let genreArray = [numOfPop, numOfRock, numOfCountry, numOfHipHop]

      let first = 0;
      let second = 0;
      let third = 0;
      let fourth = 0;

      let firstIndex = 0;
      let secondIndex = 0;
      let thirdIndex = 0;
      let fourthIndex = 0;


      for (let i = 0; i < genreArray.length; i++) {

        if (genreArray[i] > first) {
          first = genreArray[i];
          firstIndex = i;
        }

        else if (genreArray[i] < first && genreArray[i] > third) {
          second = genreArray[i];
          secondIndex = i;
        }

        else if (genreArray[i] < second && genreArray[i] > fourth) {
          third = genreArray[i];
          thirdIndex = i;
        }

        // else if (genreArray[i] <= fourth) {
        //   fourth = genreArray[i];
        //   fourthIndex = i;
        // }

        else {
          fourth = genreArray[i];
          fourthIndex = i;
        }

      }


      let genres = ["pop", "rock", "country", "hiphop"];

      let chance = Math.round(Math.random() * 100);

      // let shuffle = Math.round(Math.random() * 100);

      console.log("chance in genre validation: " + chance);

      // conso.log("shuffle val in genre validation: " + shuffle);

      if (first == second || first == third || first == fourth) {
        console.log("if there are two or more number of genres that are the same");

        if (chance >= 25 && chance < 50) {
          console.log("chance was >25 but <50");
          songGenre = genres[firstIndex];
          console.log("songGenre in if stmt: " + songGenre);
        }
        else if (chance >= 50 && chance < 75) {
          console.log("chance was >50 but <75");
          songGenre = genres[secondIndex];
          console.log("songGenre in if stmt: " + songGenre);
        }
        else if (chance == 75) {
          console.log("chance was greater than 75");
          songGenre = genres[thirdIndex];
          console.log("songGenre in if stmt: " + songGenre);
        }
        else {
          console.log("chance was higher than 75");
          songGenre = genres[fourthIndex];
          console.log("songGenre in if stmt: " + songGenre);
        }
      }

      // else if (second == third || second == fourth) {
      //   console.log("if there are two or more number of genres that are the same");

      //   if (chance >= 25 && chance < 50) {
      //     console.log("chance was >25 but <50");
      //     songGenre = genres[secondIndex];
      //     console.log("songGenre in if stmt: " + songGenre);
      //   }
      //   else if (chance >= 50 && chance < 75) {
      //     console.log("chance was >50 but <75");
      //     songGenre = genres[thirdIndex];
      //     console.log("songGenre in if stmt: " + songGenre);
      //   }
      //   else {
      //     console.log("chance was greater than 75");
      //     songGenre = genres[fourthIndex];
      //     console.log("songGenre in if stmt: " + songGenre);
      //   }
      // }

      // else {
      //   console.log("if there are two or more number of genres that are the same");

      //   if (chance >= 25 && chance < 50) {
      //     console.log("chance was >25 but <50");
      //     songGenre = genres[thirdIndex];
      //     console.log("songGenre in if stmt: " + songGenre);
      //   }
      //   else {
      //     console.log("chance was greater than 50");
      //     songGenre = genres[fourthIndex];
      //     console.log("songGenre in if stmt: " + songGenre);
      //   }
      // }

      //assign genre in set of final if statements

      if (chance < 25 || chance >= 25 && chance < 50) {
        console.log("chance was >25 but <50");
        songGenre = genres[firstIndex];
        console.log("songGenre in if stmt: " + songGenre);
      }
      else if (chance >= 50 && chance < 75) {
        console.log("chance was >50 but <75");
        songGenre = genres[secondIndex];
        console.log("songGenre in if stmt: " + songGenre);
      }
      else if (chance == 75) {
        console.log("chance was greater than 75");
        songGenre = genres[thirdIndex];
        console.log("songGenre in if stmt: " + songGenre);
      }
      else {
        console.log("chance was higher than 75");
        songGenre = genres[fourthIndex];
        console.log("songGenre in if stmt: " + songGenre);
      }

      console.log("first place: " + first + "[" + firstIndex + "]");
      console.log("second place: " + second + "[" + secondIndex + "]");
      console.log("third place: " + third + "[" + thirdIndex + "]");
      console.log("fourth place: " + fourth + "[" + fourthIndex + "]");

      console.log("genreArray: " + genreArray);


      return songGenre;
    });

    const similarSongs = await Song.find({ genre: songGenre })
      .populate("artist")
      .populate("featuredArtists")
      .populate("album")
      .sort();

    if (!similarSongs || similarSongs.length === 0) {
      console.log("No similar songs found");
      return randomSong(user);
      //return res.status(404).send("similar songs not found");
    }

    else {
      console.log("it found similar songs");

      console.log("similarSongs array: " + similarSongs);

      const songLimit = [];

      while (songLimit.length < 5) {

        const randomSimilarSong = similarSongs[Math.floor(Math.random() * similarSongs.length)];

        console.log("randomSong in for loop: " + randomSimilarSong);

        if (!randomSimilarSong) {
          console.log("randomSong not found");
        }

        if (!songLimit.includes(randomSimilarSong._id) || !user.likedSongs.includes(randomSimilarSong._id) || !songLimit.includes(randomSimilarSong._id) && !user.likedSongs.includes(randomSimilarSong._id) ) {
          songLimit.push(randomSimilarSong);
          console.log("added randomSong: " + randomSimilarSong.title);
        }
      }
      console.log("songLimit length: " + songLimit.length)

      if (songLimit.length > 5) {
        throw new Error("Song limit cannot be greater than 5.");
      }
      return songLimit;
    }

    //   console.log("songID: " + songId);

    //   // if (!mongoose.Types.ObjectId.isValid(songId)) {
    //   //   return res.status(404).json({ err: "No such song" });
    //   // }

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

    //   let songGenre = currentSong.genre;

    //   console.log("songGenre: " + songGenre);

    //   if (!songGenre || songGenre == null) {
    //     throw new Error("SongGenre not found");
    //   }

    //   let numOfPop = 0;
    //   let numOfRock = 0;
    //   let numOfCountry = 0;
    //   let numOfHipHop = 0;

    //   switch (songGenre) {
    //     case "pop":
    //       numOfPop++;
    //       console.log("popValue: " + numOfPop);
    //       break;
    //     case "rock":
    //       numOfRock++;
    //       console.log("rockValue: " + numOfRock);
    //       break;
    //     case "country":
    //       numOfCountry++;
    //       console.log("countryValue: " + numOfCountry);
    //       break;
    //     case "hiphop":
    //       numOfHipHop++;
    //       console.log("hipHopValue: " + numOfHipHop);
    //       break;
    //     default:
    //       console.log("Invalid songGenre");
    //       break;
    //   }

    //   let genreArray = [numOfPop, numOfRock, numOfCountry, numOfHipHop]

    //   console.log("genreArray: " + genreArray);

    //   let first = 0;

    //   let firstIndex = 0;

    //   for (let i = 0; i < genreArray.length; i++) {
    //     if (genreArray[i] > first) {
    //       first = genreArray[i];
    //       firstIndex = i;
    //     }
    //     console.log("first: " + first);
    //     console.log("firstIndex: " + firstIndex);
    //   }

    //   let genres = ["pop", "rock", "country", "hiphop"];

    //   if (first > 0) {
    //     songGenre = genres[firstIndex];
    //     console.log("songGenre in if stmt: " + songGenre);
    //   }
    //   return songGenre;
    // }

    // const similarSongs = await Song.find({ genre: songGenre })
    //   .populate("artist")
    //   .populate("featuredArtists")
    //   .populate("album")
    //   .sort();

    // if (!similarSongs) {
    //   return res.status(404).send("songs not found");
    // }

    // //const songLimit = [];

    // while (songLimit.length < 5) {

    //   const randomSong = similarSongs[Math.floor(Math.random() * similarSongs.length)];

    //   if (!songLimit.includes(randomSong) && !user.likedSongs.includes(randomSong)) {
    //     songLimit.push(randomSong);
    //     console.log("added randomSong: " + randomSong.title);
    //   }
    // }
    // console.log("songLimit length: " + songLimit.length)

    // if (songLimit.length > 5) {
    //   throw new Error("Song limit cannot be greater than 5.");
    // }

    // return songLimit;

  } catch (err) {
    console.log(err);
    throw new Error("tempo and beat validation failed");
  }
}

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

    if (!songLimit.includes(randomSong._id) || !user.likedSongs.includes(randomSong._id) || !songLimit.includes(randomSong._id) && !user.likedSongs.includes(randomSong._id)) {
      songLimit.push(randomSong);
      console.log("added randomSong: " + randomSong.title);
    }
  }
  console.log("songLimit length: " + songLimit.length)

  if (songLimit.length > 5) {
    throw new Error("Song limit cannot be greater than 5.");
  }

  return songLimit;
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

    if (user.likedSongs.length == 0) {

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

        if (!songLimit.includes(randomSong._id) || !user.likedSongs.includes(randomSong._id) || !songLimit.includes(randomSong._id) && !user.likedSongs.includes(randomSong._id) ) {
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

      let chance = Math.round(Math.random() * 100);

      console.log("chance in outer function: " + chance)

      if (chance > 50) {
        console.log("chance was higher than 50");
        const similarSongsLimit = await compareSongData(user);
        res.status(200).json(similarSongsLimit);

      }

      else {
        console.log("chance was less than or equal 50");
        const differentSongsLimit = await randomSong(user);
        res.status(200).json(differentSongsLimit);
      }
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

    console.log("swipe direction test: " + req.body.likedSongs);

    const songArray = await Promise.all(
      req.body.likedSongs.map(async (currentSong, i = 0) => {
        const song = await Song.findById(currentSong._id);

        if (!song) {
          throw new Error("Featured artist not found");
        }

        console.log("song: " + song);

        if (!req.body.likedSongs[i].direction || req.body.likedSongs[i].direction == null) {

          console.log("swipeDirection not found");
        }
        else {

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
