const CuratedPlaylist = require("../../models/curatedPlaylist model/curatedPlaylist-model");
const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const User = require("../../models/user model/user-model");

const mongoose = require("mongoose");
//get all curatedPlaylist
const getAllCuratedPlaylist = async (req, res) => {
  const curatedPlaylists = await CuratedPlaylist.find({
    isGenerated: true,
  }).sort({ createdAt: -1 });

  res.status(200).json(curatedPlaylists);
};

const foryou = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  const curatedPlaylists = await CuratedPlaylist.findOne({
    belongTo: user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json(curatedPlaylists);
};

//get 1 pl
const getACuratedPlaylist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such curatedPlaylist" });
  }

  const curatedPlaylist = await CuratedPlaylist.findById(id)
    .populate("curatedPlaylistCreator")
    .populate({
      path: "songList",
      populate: {
        path: "artist",
        select: "artistName",
      },
    });
  if (!curatedPlaylist) {
    return res.status(404).json({ err: "No such curatedPlaylist" });
  } else {
    console.log(curatedPlaylist);

    res.status(200).json(curatedPlaylist);
  }
};

// const generateCuratedPlaylists = async (req, res) => {

//     try {
//         const { id } = req.body;

//         if (id) {
//             await createTopUserSongsPlaylist(id);
//         }

//          res.status(201).json({ msg: "curated playlists created!" });

//     } catch (err) {
//         console.log(err);
//         res.status(404).json({ err: err.message });
//     }
// }

const createTopUserSongsPlaylist = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);
    await CuratedPlaylist.deleteOne({ belongTo: user._id });
    console.log("user in func: " + user);

    let numOfPop = 0;
    let numOfRock = 0;
    let numOfCountry = 0;
    let numOfHipHop = 0;

    let songGenre = "";

    const songs = await Song.find({ _id: { $in: user.likedSongs } }).sort({
      genre: -1,
    });

    songs.map(async (song) => {
      console.log(
        "songId: " +
          song._id +
          ", currentSong title: " +
          song.title +
          ", genre: " +
          song.genre
      );

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

    console.log("songGenre after random shuffler: " + songGenre);

    let similarSongs = [];

    let songLimit = [];

    similarSongs = await Song.find({ genre: songGenre })
      .populate("artist")
      .populate("featuredArtists")
      .populate("album")
      .sort();

    console.log("similarSongs length: " + similarSongs.length);

    if (
      !similarSongs ||
      similarSongs.length === 0 ||
      (similarSongs.length > 0 && similarSongs.length < 5)
    ) {
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

    if (similarSongs.length === 5) {
      console.log(
        "similarSongs only has 5 songs, so we're returning it to the outer function."
      );
      songLimit = similarSongs;

      const name = "For You";
      const image =
        "https://firebasestorage.googleapis.com/v0/b/helical-analyst-376421.appspot.com/o/images%2Ffor_ypu.png?alt=media&token=1b00e19a-ce4b-4700-9cb1-e7bc48c04cec";

      const curatedPlaylist = new CuratedPlaylist({
        curatedPlaylistName: name,
        curatedPlaylistBio: "Daily songs picked out for you!",
        curatedPlaylistCoverUrl: image,
        songList: songLimit,
        isGenerated: false,
        belongTo: user._id,
      });

      console.log("curatedPlaylist: " + curatedPlaylist);

      await curatedPlaylist.save();
      return curatedPlaylist;
    }

    console.log("should be out of for loop after finding similarSongs");

    similarSongs.map((song) => {
      console.log(
        "song title in similarSongs: " + song.title + ", genre: " + song.genre
      );
    });

    while (songLimit.length < 2) {
      const randomSimilarSong =
        similarSongs[Math.floor(Math.random() * similarSongs.length)];

      if (!randomSimilarSong) {
        console.log("randomSong not found");
      }

      if (
        !songLimit.some((song) => song._id === randomSimilarSong._id) &&
        !user.likedSongs.includes(randomSimilarSong._id)
      ) {
        songLimit.push(randomSimilarSong);
      }
    }

    songLimit.map((song) => {
      console.log(
        "song title in songlimit: " + song.title + ", genre: " + song.genre
      );
    });

    console.log("songLimit length: " + songLimit.length);

    if (songLimit.length > 2) {
      throw new Error("Song limit cannot be greater than 5.");
    }

    const name = "For You";
    const image =
      "https://firebasestorage.googleapis.com/v0/b/helical-analyst-376421.appspot.com/o/images%2Ffor_ypu.png?alt=media&token=1b00e19a-ce4b-4700-9cb1-e7bc48c04cec";
    const curatedPlaylist = new CuratedPlaylist({
      curatedPlaylistName: name,
      curatedPlaylistBio: "Daily songs picked out for you!",
      curatedPlaylistCoverUrl: image,
      songList: songLimit,
      isGenerated: false,
      belongTo: user._id,
    });

    console.log("curatedPlaylist: " + curatedPlaylist);

    await curatedPlaylist.save();
    ///return curatedPlaylist;

    res.status(200).send({ curatedPlaylist });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  getAllCuratedPlaylist,
  getACuratedPlaylist,
  createTopUserSongsPlaylist,
  foryou,
};
