const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");
const EP = require("../../models/ep model/ep-model");

const mongoose = require("mongoose");

const createSong = async (req, res) => {
  console.log("createSong", req.body);

  const artistID = req.body.artistID;
  let success = "";

  try {
    // artist id check
    const artist = await Artist.findOne({ _id: artistID });

    const artistId = artist._id;

    if (!artist) {
      throw new Error("Artist not found");
    }

    if (!req.body.releaseType) {
      res.status(400).json({ error: "Please enter a avalid year" });
    }
    if (req.body.releaseType === "single") {
      console.log(req.body.releaseType);
      success = "Created a single song successfully";

      if (req.body.featuredArtists == null || !req.body.featuredArtists) {
        console.log("songFile" + req.body.songFile);

        if (!req.body.songFile) {
          return res.status(500).json({ error: "You do not have the song" });
        }
        const song = new Song({
          ...req.body,
          artist: artistId,
        });

        artist.songList.push(song._id);

        await song.save();
        await artist.save();

        res.status(201).json({ song, success });
      } else {
        console.log("featured artists: " + req.body.featuredArtists);

        const song = new Song({
          ...req.body,
          artist: artist._id,
          releaseType: "single",
          featuredArtists: req.body.featuredArtists,
        });

        for (const artist of req.body.featuredArtists) {
          const fArtist = await Artist.findById(artist);

          if (!fArtist) {
            res
              .status(404)
              .json({ error: "This artist is not on our platform." });
          }

          fArtist.songList.push(song._id);
          await fArtist.save();
        }

        artist.songList.push(song._id);

        await song.save();
        await artist.save();
        res.status(201).json({ song, success });
      }
    } else if (req.body.releaseType === "album") {
      success = "Created an album successfully";

      const album = await Album.findOne({ albumName: req.body.album });

      if (!album) {
        res.status(404).json({ error: "Album does not exist" });
      }

      const albumId = album._id;

      if (req.body.featuredArtists == null || !req.body.featuredArtists) {
        const song = new Song({
          ...req.body,
          artist: artistId,
          album: albumId,
          releaseType: "album",
        });

        if (song.album) {
          album.songList.push(song._id);

          song.genre = album.albumGenre;

          song.releaseYear = album.releaseYear;

          await album.save();
        }

        console.log("after song is made");

        artist.songList.push(song._id);

        await song.save();

        console.log("BONGUGSS");

        await artist.save();
        res.status(201).json({ song, success });
      } else {
        const song = new Song({
          ...req.body,
          artist: artist._id,
          album: album._id,
          releaseType: "album",
          featuredArtists: req.body.featuredArtists,
        });

        for (const artist of req.body.featuredArtists) {
          const fArtist = await Artist.findById(artist);

          if (!fArtist) {
            res
              .status(404)
              .json({ error: "This artist is not on our platform." });
          }

          fArtist.songList.push(song._id);
          await fArtist.save();
        }

        if (song.album) {
          album.songList.push(song._id);

          song.genre = album.albumGenre;

          song.releaseYear = album.releaseYear;

          await album.save();
        }

        artist.songList.push(song._id);

        await song.save();
        await artist.save();
        res.status(201).json({ song, success });
      }
    } else if (req.body.releaseType === "ep") {
      const ep = await EP.findOne({ epName: req.body.ep });
      success = "Created an EP successfully";
      if (!ep) {
        res.status(404).json({ error: "EP does not exist." });
      }

      const epId = ep._id;

      if (req.body.featuredArtists == null || !req.body.featuredArtists) {
        console.log("before song is made");

        const song = new Song({
          ...req.body,
          artist: artistId,
          ep: epId,
          releaseType: "ep",
        });

        if (song.ep) {
          ep.songList.push(song._id);

          song.genre = ep.epGenre;

          song.releaseYear = ep.releaseYear;

          await ep.save();
        }

        console.log("after song is made");

        artist.songList.push(song._id);

        await song.save();

        console.log("BONGUGSS");

        await artist.save();
        res.status(201).json({ song, success });
      } else {
        const song = new Song({
          ...req.body,
          artist: artist._id,
          ep: epId,
          releaseType: "ep",
          featuredArtists: req.body.featuredArtists,
        });

        for (const artist of req.body.featuredArtists) {
          const fArtist = await Artist.findById(artist);

          if (!fArtist) {
            res
              .status(404)
              .json({ error: "This artist is not on our platform." });
          }

          fArtist.songList.push(song._id);
          await fArtist.save();
        }

        if (song.ep) {
          ep.songList.push(song._id);

          song.releaseYear = ep.releaseYear;

          await ep.save();
        }

        artist.songList.push(song._id);

        await song.save();
        await artist.save();
        res.status(201).json({ song, success });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//get all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find({})

      .populate("featuredArtists")
      .populate("artist")
      .populate("album")
      .populate("ep")
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

  const song = await Song.findById(id).populate(
    "featuredArtists",
    "artistName"
  );

  if (!song) {
    return response.status(404).json({ error: "Song not found" });
  } else {
    console.log(song);

    console.log("getOneSong method working");

    response.status(200).json(song);
  }
};
// get My song
const getMySong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "You have not sign in" });
  }

  const songs = await Song.find({ artist: id })
    .populate("featuredArtists")
    .populate("artist")
    .populate("album")
    .populate("ep")
    .sort({ createdAt: -1 });
  if (!songs) {
    return res.status(404).json({ error: "You don't have any song" });
  }
  res.status(200).json(songs);
};

// get artist's TOP searched song
const getMyTopSearchSong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "You have not sign in" });
  }

  const songs = await Song.find({ artist: id })
    .populate("featuredArtists")
    .populate("artist")
    .populate("album")
    .populate("ep")
    .sort({ createdAt: -1 });

  if (!songs) {
    return res.status(404).json({ error: "You don't have any song" });
  }

  let topSong = null;

  for (const song of songs) {
    if (
      (song.searchCount && song.searchCount > topSong.searchCount) ||
      !topSong
    ) {
      topSong = song;
      console.log(song.searchCount);
    }
    // console.log(song)
  }

  res.status(200).json(topSong);
};

// sort artist's songs by most searched
const getSongsBySearchCount = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "You have not sign in" });
  }

  const songs = await Song.find({ artist: id })
    .limit(5)
    .sort({ searchCount: -1, title: 1 });
  if (!songs) {
    return res.status(404).json({ error: "You don't have any song" });
  }

  res.status(200).json(songs);
};

// get artist's most loved song
const getMyTopLovedSong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "You have not sign in" });
  }

  const songs = await Song.find({ artist: id }).sort({ createdAt: -1 });
  if (!songs) {
    return res.status(404).json({ error: "You don't have any song" });
  }

  let topSong = null;

  for (const song of songs) {
    if (
      (song.isLoved.length && song.isLoved.length > topSong.isLoved.length) ||
      !topSong
    ) {
      topSong = song;
      console.log(song.isLoved.length);
    }
    // console.log(song)
  }

  res.status(200).json(topSong);
};

// get artist loved songs from greatest to least
const getSongsByLoveCount = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "You have not sign in" });
  }

  // Song.aggregate().addFields({totalLoved: { "$size": "$isLoved"}})
  // ([
  //   {
  //     $addFields: {
  //       totalLoved: { $sum: isLoved} ,
  //     }
  //   },

  // ])

  const songs = await Song.aggregate([
    {
      $match: {
        artist: mongoose.Types.ObjectId(id),
      },
    },
    {
      $set: {
        totalLoved: { $size: "$isLoved" },
      },
    },
    {
      $sort: {
        totalLoved: -1,
      },
    },
  ]);

  // const lovedSongs = await Song.find({ artist: id }).sort({ totalLoved: -1 });
  if (!songs) {
    return res.status(404).json({ error: "You don't have any song" });
  }

  res.status(200).json(songs);
};

const updateSong = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    artistID, // this is the primary artist
    featureArtists,
    album,
    ep,
    songYear,
    imgUrl,
    genre,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such song" });
  }
  try {
    const song = await Song.findById(id);
    song.title = title;
    song.releaseYear = songYear;
    song.imgUrl = imgUrl;
    song.genre = genre;
    song.featuredArtists = featureArtists;

    const featureArtistsIds =
      (featureArtists && featureArtists.map((item) => item._id)) || [];

    // let testId = 0;
    // Add song to the songlist of each featured artist
    for (const fArtist of featureArtists) {
      const featuredArtist = await Artist.findById({ _id: fArtist._id });

      if (!featuredArtist) {
        return res
          .status(404)
          .json({ error: "This featured artist doesn't exist" });
      }

      if (!featuredArtist.songList.includes(song._id)) {
        featuredArtist.songList.push(song._id);
        await featuredArtist.save();
      }
    }

    if (featureArtistsIds.length === 0) {
      const foundArtists = await Artist.find({
        songList: { $in: [song._id] },
      });

      for (const artist of foundArtists) {
        artist.songList.pull(song._id);
        await artist.save();
      }
    } else {
      for (const fArtist of song.featuredArtists) {
        console.log("current id=", fArtist);
        if (!featureArtistsIds.includes(fArtist.toString())) {
          const featuredArtist = await Artist.findById({
            _id: fArtist.toString(),
          });

          if (!featuredArtist) {
            return res
              .status(404)
              .json({ error: "This featured artist doesn't exist" });
          }

          featuredArtist.songList.pull(song._id);
          await featuredArtist.save();
        }
      }
    }

    const artist = await Artist.findOne({ _id: artistID });

    if (!artist) {
      res.status(404).json({ error: "This artist doesn't exist" });
    }

    console.log(
      "compare",
      artistID,
      song.artist._id.toString(),
      song.artist._id.toString() !== artistID
    );
    if (song.artist._id.toString() !== artistID) {
      artist.songList.push(song._id);
      await artist.save();
    }
    song.artist = artist;
    //check if the song is single
    if (!album && !ep) {
      await Album.updateOne(
        { _id: song.album },
        { $pull: { songList: song._id } }
      );
      await EP.updateOne({ _id: song.ep }, { $pull: { songList: song._id } });
      song.album = null;
      song.ep = null;
      song.releaseType = "single";
    } else if (album && !ep) {
      const newAlbum = await Album.findOne({ _id: album });
      if (!newAlbum) {
        res.status(404).json({ error: "This album doesn't exist" });
      }
      song.album = newAlbum;
      await EP.updateOne({ _id: song.ep }, { $pull: { songList: song._id } });
      if (!newAlbum.songList.includes(song._id)) {
        await newAlbum.updateOne({ $push: { songList: id } });
        song.ep = null;
        song.releaseType = "album";
      }
    } else if (!album && ep) {
      const newEP = await EP.findById(ep);
      if (!newEP) {
        res.status(404).json({ error: "This ep doesn't exist" });
      }

      if (newEP.songList.length >= 5) {
        res.status(500).json({ error: "The limit of the ep is 5 songs" });
      }
      await Album.updateOne(
        { _id: song.album },
        { $pull: { songList: song._id } }
      );
      song.ep = newEP;
      if (!newEP.songList.includes(song._id)) {
        const updateEp = await newEP.updateOne({ $push: { songList: id } });
        song.album = null;
        song.releaseType = "ep";
      }
    } else {
      res
        .status(404)
        .json({ error: "Can only this song in either album or ep" });
    }

    await song.save();
    const success = "Updated Song successfully";
    res.status(200).json({ song, success });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

module.exports = {
  getAllSongs,
  getMySong,
  getMyTopSearchSong,
  getSongsBySearchCount,
  getMyTopLovedSong,
  getSongsByLoveCount,
  getSong,
  createSong,
  deleteSong,
  updateSong,
};
