const mongoose = require("mongoose");
const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");

const getAllAlbum = async (req, res) => {
  const albums = await Album.find({})
  .populate("artist")
  .populate("featuredArtist")
  .sort({ createdAt: -1 });
  res.status(200).json(albums);
};

const getAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ err: "No such Album" });
  }

  const album = await Album.findById(id)
  .populate("artist")
  .populate("featuredArtist");

  if (!album) {
    return res.status(400).json({ err: "No such Album" });
  }

  res.status(200).json(album);
};

const createAlbum = async (req, res) => {
  const artistID = req.body.artistID;
  const success = "Created album successfully";
  try {
    const artist = await Artist.findById(artistID);

    //console.log(artist);

    if (!artist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    const album = new Album({
      ...req.body,
      artist: artist._id,
    });

    album.songList = [];
    artist.albumList.push(album._id);

    await album.save();
    await artist.save();

    console.log("made album properly");
    res.status(201).json({ album, success });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
// console.log("Request Body FT: " + req.body.featuredArtists);

// if (!req.body.featuredArtists || req.body.featuredArtists == null) {
//   console.log("inside album method");
//   const album = new Album({
//     ...req.body,
//     artist: artist._id,
//   });

//   album.songList = [];
//   artist.albumList.push(album._id);

//   await album.save();
//   await artist.save();

//   console.log("made album properly");
//   res.status(201).json({album, success});
// } else {
//   const featuredArtists = await Promise.all(
//     req.body.featuredArtists.map(async (name) => {
//       const featuredArtist = await Artist.findOne({ artistName: name });

//       if (!featuredArtist) {
//         throw new Error("featured artist(s) not found");
//       }

//       return featuredArtist._id;
//     })
//   );

//   console.log(featuredArtists);

//   const album = new Album({
//     ...req.body,
//     artist: artist._id,
//     featuredArtists: featuredArtists,
//   });

//   album.songList = [];
//   artist.albumList.push(album._id);

//   for (const featuredArtistId of featuredArtists) {
//     const featuredArtist = await Artist.findById(featuredArtistId);
//     featuredArtist.albumList.push(album._id);
//     await featuredArtist.save();
//   }

//   await album.save();
//   await artist.save();

//   res.status(201).json({album, success});

//WIP
const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { albumArt, albumName, artist, releaseYear, songList, genre } =
    req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such album" });
  }

  try {
    const album = await Album.findById(id);

    const albumArtist = await Artist.findById(artist);
    if (!albumArtist) {
      res.status(404).json({ error: "Artist is not available" });
    }
    album.releaseYear = releaseYear;
    album.albumName = albumName;
    album.artist = albumArtist;

    console.log(album.artist, artist);
    album.albumArt = albumArt;
    album.genre = genre;

    const songListIDs = (songList && songList.map((item) => item._id)) || [];
    //adding a song into album songlist
    for (const song of songList) {
      const foundSong = await Song.findById(song);

      if (!foundSong) {
        return res.status(404).json({ error: "This song  doesn't exist" });
      }

      if (
        foundSong.album === null ||
        (foundSong.album._id.toString() !== id &&
          !album.songList.includes(foundSong._id))
      ) {
        album.songList.push(foundSong._id);
        foundSong.album = album;
        foundSong.releaseType = "album";
        await foundSong.save();
      }
    }
    //remove the song out of the album
    if (songList.length === 0) {
      const albumSongs = await Song.find({ album: id });

      for (const song of albumSongs) {
        song.album = null;
        song.releaseType = "single";
        album.songList = [];
        await song.save();
      }
    } else {
      for (const songs of album.songList) {
        if (!songListIDs.includes(songs.toString())) {
          album.songList.pull(songs);
          const foundSong = await Song.findById(songs);

          foundSong.album = null;
          foundSong.releaseType = "single";
          await foundSong.save();
        }
      }
    }
    album.songList = songList;
    const success = "Updated album successfully";
    await album.save();
    res.status(200).json({ album, success });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//WIP
const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  const success = "Deleted album successfully";
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such album" });
  }

  try {
    const album = await Album.findById(id);

    if (!album) {
      throw new Error("album not found");
    }

    const artist = await Artist.findOne({ _id: album.artist._id });

    if (!artist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    const featuredArtists = await Promise.all(
      album.featuredArtists.map(async () => {
        const featuredArtist = await Artist.findOne({
          _id: album.featuredArtists,
        });

        if (!featuredArtist) {
          throw new Error(" featured artist not found");
        }

        return featuredArtist._id;
      })
    );

    await Album.findOneAndDelete({ _id: id });

    await Artist.updateOne(
      { _id: artist._id },
      { $pull: { albumList: album._id, songList: { $in: album.songList } } }
    );

    await Song.deleteMany({ _id: album.songList });

    for (const featuredArtistId of featuredArtists) {
      await Artist.updateOne(
        { _id: featuredArtistId },
        { $pull: { albumList: album._id, songList: { $in: album.songList } } }
      );

      await Song.deleteMany({ _id: featuredArtists.songList });
    }

    if (!album) {
      return res.status(404).json({ message: "No such album" });
    }

    res.status(200).json({ album, success });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getMyAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Server error occurred" });
    }

    const albums = await Album.find({ artist: id })
      .populate("featuredArtists")
      .populate("artist")
      .populate("songList")
      .sort({ createdAt: -1 });
    if (!albums) {
      return res.status(404).json({ error: "You don't have any song" });
    }
    res.status(200).json(albums);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAlbum,
  getMyAlbum,
  getAllAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
