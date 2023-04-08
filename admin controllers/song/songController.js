const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");
const User = require("../../models/user model/user-model");

const mongoose = require("mongoose");
const { json } = require("express");

const createSong = async (req, res) => {
  console.log("createSong", req.body);

  switch (req.body.releaseType) {
    case "Album" || "EP":
      try {
        const artist = await Artist.findOne({ artistName: req.body.artist });

        console.log(artist);

        if (!artist) {
          throw new Error("Artist not found");
        }

        const album = await Album.findOne({ albumName: req.body.album });

        if (!album) {
          throw new Error("Album not found");
        }

        if (req.body.featuredArtists == null || !req.body.featuredArtists) {
          const song = new Song({
            ...req.body,
            artist: artist._id,
            album: album._id,
            releaseType: "Album",
          });

          if (song.album) {
            album.songList.push(song._id);

            album.totalTracks++;

            song.releaseYear = album.releaseYear;

            await album.save();
          }

          artist.songList.push(song._id);

          await song.save();
          await artist.save();
          res.status(201).json(song);
        } else {
          const featuredArtists = await Promise.all(
            req.body.featuredArtists.map(async (name) => {
              const featuredArtist = await Artist.findOne({ artistName: name });

              if (!featuredArtist) {
                throw new Error("Featured artist not found");
              }

              return featuredArtist._id;
            })
          );

          console.log(featuredArtists);

          const song = new Song({
            ...req.body,
            artist: artist._id,
            album: album._id,
            releaseType: "Album",
            featuredArtists: featuredArtists,
          });

          if (song.album) {
            album.songList.push(song._id);

            album.totalTracks++;

            song.releaseYear = album.releaseYear;

            await album.save();
          }

          artist.songList.push(song._id);

          for (const featuredArtistId of featuredArtists) {
            const featuredArtist = await Artist.findById(featuredArtistId);
            featuredArtist.songList.push(song._id);

            // if (!featuredArtist.album._id || featuredArtist.album._id == null) {

            //     featuredArtist.albumList.push(album._id);
            // }

            await featuredArtist.save();
          }

          await song.save();
          await artist.save();
          res.status(201).json(song);
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
      }
      break;

    case "Single":
      try {
        const artist = await Artist.findOne({ artistName: req.body.artist });
        console.log(artist);

        if (!artist) {
          throw new Error("Artist not found");
        }

        if (req.body.featuredArtist == null || !req.body.featuredArtists) {
          console.log(req.body.featuredArtist);

          //check why is it null (did user decide to do solo or other artists cannot be found?);

          const song = new Song({
            ...req.body,
            artist: artist._id,
          });

          artist.songList.push(song._id);

          await song.save();
          await artist.save();
          res.status(201).json(song);
        } else {
          const featuredArtists = await Promise.all(
            req.body.featuredArtists.map(async (name) => {
              const featuredArtist = await Artist.findOne({ artistName: name });

              if (!featuredArtist) {
                throw new Error("featured artist(s) not found");
              }

              return featuredArtist._id;
            })
          );

          console.log(featuredArtists);

          const song = new Song({
            ...req.body,
            artist: artist._id,
            featuredArtists: featuredArtists,
          });

          artist.songList.push(song._id);

          for (const featuredArtistId of featuredArtists) {
            const featuredArtist = await Artist.findById(featuredArtistId);
            featuredArtist.songList.push(song._id);
            await featuredArtist.save();
          }

          await song.save();
          await artist.save();
          res.status(201).json(song);
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
      }
      break;
    default:
      break;
  }
};

//get all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("artist")
      .populate("featuredArtists")
      .populate("album")
      .sort({ createdAt: -1 });

    console.log("getAllSongs method working");

    res.status(200).json(songs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "fetching songs failed" });
  }
};

//get song
const getSong = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such song" });
  }

  const song = await Song.findById(id)
    .populate("artist")
    .populate("featuredArtists")
    .populate("album");

  if (!song) {
    return response.status(404).json({ error: "Song not found" });
  } else {
    console.log(song);

    response.status(200).json(song);
  }
};

const songViewed = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such song" });
  }

  try {
    const song = await Song.findById(id);
    await Song.findOneAndUpdate(
      { _id: song._id },
      { $inc: { searchCount: 1 } }
    );

    res.status(201).json({ message: "View +1" });
  } catch {
    res.status(200).json();
  }
};
//WIP
const updateSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such song" });
  }

  switch (req.body.releaseType) {
    case "Album" || "EP":
      try {
        const artist = await Artist.findOne({ artistName: req.body.artist });

        if (!artist) {
          throw new Error("artist not found");
        }

        const album = await Album.findOne({ albumName: req.body.album });

        if (!album) {
          throw new Error("album not found");
        }

        const featuredArtists = await Promise.all(
          req.body.featuredArtists.map(async (name) => {
            const featuredArtist = await Artist.findOne({ artistName: name });

            if (!featuredArtist) {
              throw new Error("featured artist(s) not found");
            }

            return featuredArtist._id;
          })
        );

        const song = await Song.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              ...req.body,
              artist: artist._id,
              album: album._id,
              featuredArtists: featuredArtists,
            },
          },
          { new: true }
        );

        for (const featuredArtistId of featuredArtists) {
          const featuredArtist = await Artist.findById(featuredArtistId);

          featuredArtist.songList.push(song._id);

          featuredArtist.albumList.push(album._id);

          await featuredArtist.save();
        }

        if (!song) {
          return res.status(404).json({ error: "Song not found" });
        }

        console.log(song);

        console.log("updateSong method working");

        res.status(200).json(song);

        // if (!req.body.featuredArtists || req.body.featuredArtists == null) {

        //     const song = await Song.findOneAndUpdate(
        //         { _id: id },
        //         { $set: { ...req.body, artist: artist._id, album: album._id } },
        //         { new: true }
        //     );

        //     for (const featuredArtistId of song.featuredArtists) {

        //         await Artist.updateOne({ _id: featuredArtistId }, { $pull: { songList: song._id } });

        //         await Song.updateOne({ _id: song._id }, { $pull: { featuredArtists: featuredArtistId } });
        //     }

        //     if (!song) {

        //         return res.status(404).json({ error: "Song not found" });
        //     }

        //     console.log(song);

        //     console.log("updateSong method working");

        //     res.status(200).json(song);

        // }
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
      }
      break;

    case "Single":
      try {
        const artist = await Artist.findOne({ artistName: req.body.artist });

        if (!artist) {
          throw new Error("artist not found");
        }

        const featuredArtists = await Promise.all(
          req.body.featuredArtists.map(async (name) => {
            const featuredArtist = await Artist.findOne({ artistName: name });

            if (!featuredArtist) {
              throw new Error("featured artist(s) not found");
            }

            return featuredArtist._id;
          })
        );

        if (!req.body.album || req.body.album == null) {
          console.log(req.params);

          const song = await Song.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                ...req.body,
                artist: artist._id,
                album: null,
                featuredArtists: featuredArtists,
              },
            },
            { new: true }
          );

          await Album.updateOne(
            { _id: song.album },
            { $pull: { songList: song._id }, $inc: { totalTracks: -1 } }
          );

          if (!song) {
            return res.status(404).json({ error: "Song not found" });
          }

          console.log(song);

          console.log("updateSong method working");

          res.status(200).json(song);
        } else {
          const album = await Album.findOne({ albumName: req.body.album });

          if (!album) {
            throw new Error("album not found");
          }

          const featuredArtists = await Promise.all(
            req.body.featuredArtists.map(async (name) => {
              const featuredArtist = await Artist.findOne({ artistName: name });

              if (!featuredArtist) {
                throw new Error("featured artist(s) not found");
              }

              return featuredArtist._id;
            })
          );

          const song = await Song.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                ...req.body,
                artist: artist._id,
                album: album._id,
                featuredArtists: featuredArtists,
              },
            },
            { new: true }
          );

          if (song.album) {
            album.songList.push(song._id);

            album.totalTracks++;

            song.releaseYear = album.releaseYear;

            await album.save();
          }

          // if (!featuredArtists.songList || !featuredArtists.albumList){

          //     for (const featuredArtistId of featuredArtists) {

          //         const featuredArtist = await Artist.findById(featuredArtistId);

          //         featuredArtist.songList.push(song._id);

          //         featuredArtist.albumList.push(album._id);

          //         await featuredArtist.save();
          //     }
          // }

          if (!song) {
            return res.status(404).json({ error: "Song not found" });
          }

          console.log(song);

          console.log("updateSong method working");

          res.status(200).json(song);
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
      }
    default:
      break;
  }
};

//WIP
const deleteSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "song not found" });
  }

  try {
    const song = await Song.findById(id);

    console.log(song);

    const artist = await Artist.findOne({ _id: song.artist._id });

    if (!artist) {
      throw new Error("Artist not found");
    }

    const album = await Album.findOne({ _id: song.album._id });

    if (!album) {
      throw new Error("Album not found");
    }

    console.log(song.featuredArtists);

    const featuredArtists = await Promise.all(
      song.featuredArtists.map(async () => {
        const featuredArtist = await Artist.findOne({
          _id: song.featuredArtists,
        });

        if (!featuredArtist) {
          throw new Error(" featured artist not found");
        }

        return featuredArtist._id;
      })
    );

    await Song.findOneAndDelete({ _id: id });

    await Artist.updateOne(
      { _id: artist._id },
      { $pull: { songList: song._id } }
    );

    for (const featuredArtistId of featuredArtists) {
      await Artist.updateOne(
        { _id: featuredArtistId },
        { $pull: { songList: song._id } }
      );
    }

    await Album.updateOne(
      { _id: album._id },
      { $pull: { songList: song._id }, $inc: { totalTracks: -1 } }
    );

    console.log("song is deleted");

    res.status(200).json({ msg: "song deleted!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getArtistSong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This artist is not available" });
  }

  const songs = await Song.find({ artist: id })
    .sort({ createdAt: -1 })
    .populate("artist");
  if (!songs) {
    return res.status(404).json({ error: "You don't have any song" });
  }
  res.status(200).json(songs);
};

const likedSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "song not available" });
  }

  try {
    const song = await Song.findOne({ _id: id });

    if (!song) {
      console.log("song not found");

      throw new Error("song not found");
    }
    const { userID } = req.body;
    console.log(userID);
    const user = await User.findOne({ _id: userID });

    if (!user) {
      console.log("user not found");

      throw new Error("user not found");
    }

    if (song.isLoved.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "Song has already been liked by the user" });
    }

    song.isLoved.push(user._id);
    user.likedSongs.push(song._id);

    await song.save();
    await user.save();

    res.status(200).json({ message: "Song liked successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const dislikeSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "song not available" });
  }

  try {
    const song = await Song.findOne({ _id: id });

    if (!song) {
      console.log("song not found");

      throw new Error("song not found");
    }
    const { userID } = req.body;
    console.log(userID);

    const user = await User.findOne({ _id: userID });

    if (!user) {
      console.log("user not found");

      throw new Error("user not found");
    }

    if (song.isLoved.includes(user._id)) {
      song.isLoved.pop(user._id);
      user.likedSongs.pop(song._id);
    }

    await song.save();

    await user.save();

    res.status(200).json({ message: "removed like successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getSongsBySearchCount = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "You have not sign in" });
  }

  const songs = await Song.find({ artist: id }).limit(5).sort({ searchCount: -1, title: 1 });
  if (!songs) {
    return res.status(404).json({ error: "You don't have any song" });
  }


  res.status(200).json(songs);
};
const genreStats = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "song not available" });
  }

  try {
    // const { userID } = req.body;

    // console.log(userID);

    const user = await User.findById(id);

    if (!user) {
      console.log("user not found");
      throw new Error("user not found");
    }

    let numOfPop = 0;
    let numOfRock = 0;
    let numOfCountry = 0;
    let numOfHipHop = 0;

    const genres = ["pop", "rock", "country", "hiphop"];

    const genreObjects = [];

    const finalGenreStats = [];

    console.log("user liked songs: " + user.likedSongs.length)

    const songs = await Song.find({ _id: { $in: user.likedSongs } })
      .sort({ genre: -1 });

    songs.map(async (song) => {

      //await Song.findOne({ user: user._id })

      console.log("current song title: " + song.title + ", genre: " + song.genre)

      switch (song.genre) {
        case "pop":
          numOfPop++;
          console.log("# of pop: " + numOfPop);
          break;
        case "rock":
          numOfRock++;
          console.log("# of rock: " + numOfRock);
          break;
        case "country":
          numOfCountry++;
          console.log("# of country: " + numOfCountry);
          break;
        case "hiphop":
          numOfHipHop++;
          console.log("# of hiphop: " + numOfHipHop);
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

    while (genreObjects < 4) {
      genreObjects.push({ genre: genres[0], value: numOfPop});
      genreObjects.push({ genre: genres[1], value: numOfRock});
      genreObjects.push({ genre: genres[2], value: numOfCountry});
      genreObjects.push({ genre: genres[3], value: numOfHipHop});
    }

    if (genreObjects.length > 4) {
      console.log("err length cannot be greater than 4");
    }

    genreObjects.sort(function (a, b) {
      return b.value - a.value;
    });

    genreObjects.map((obj) => {
      console.log("genre: " + obj.genre + ", value: " + obj.value);
    });

    console.log("genreObjects length: " + genreObjects.length);

    console.log("firstGenre: " + genreObjects[0].genre + ", value: " + genreObjects[0].value);
    console.log("secondGenre: " + genreObjects[1].genre + ", value: " + genreObjects[1].value);
    console.log("thirdGenre: " + genreObjects[2].genre + ", value: " + genreObjects[2].value);

    const length = user.likedSongs.length;

    const firstPlace = (genreObjects[0].value / length) * 100;
    const secondPlace = (genreObjects[1].value / length) * 100;
    const thirdPlace = (genreObjects[2].value / length) * 100;

    console.log("percentage of " + genreObjects[0].genre + " in likedSongs: " + firstPlace);
    console.log("percentage of " + genreObjects[1].genre + " in likedSongs: " + secondPlace);
    console.log("percentage of " + genreObjects[2].genre + " in likedSongs: " + thirdPlace);

    finalGenreStats.push({ genre: genreObjects[0].genre, value: firstPlace});
    finalGenreStats.push({ genre: genreObjects[1].genre, value: secondPlace});
    finalGenreStats.push({ genre: genreObjects[2].genre, value: thirdPlace});


    res.status(200).json({finalGenreStats});
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getAllSongs,
  getSong,
  getArtistSong,
  createSong,
  deleteSong,
  updateSong,
  likedSong,
  dislikeSong,
  songViewed,
  getSongsBySearchCount,
  genreStats
};
