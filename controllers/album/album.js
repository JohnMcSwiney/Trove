const mongoose = require("mongoose");
const Song = require("../../models/songs/song");
const Artist = require("../../models/artists/artist");
const Album = require("../../models/albums/album");
const album = require("../../models/albums/album");

const getAllAlbum = async (req, res) => {
  try {
    const albums = await Album.find({})
      .populate("artist")
      .populate("featuredArtists")
      .populate("songList")

      .sort({ createdAt: -1 });

    const MonthDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Get all users created after the date 30 days ago
    const newAlbums = await Album.find({
      createdAt: { $gte: MonthDaysAgo },
    }).sort({ createdAt: -1 });

    // Get the number of users created before the date 30 days ago
    const oldAlbumsCount = await Album.countDocuments({
      createdAt: { $lt: MonthDaysAgo },
    });

    // Calculate the total increase or decrease in users
    const totalDiff =
      oldAlbumsCount >= 0
        ? newAlbums.length - oldAlbumsCount
        : newAlbums.length;

    const percentageChange =
      oldAlbumsCount > 0
        ? ((totalDiff / oldAlbumsCount) * 100).toFixed(2)
        : "N/A";

    const changeType = totalDiff >= 0 ? "increase" : "decrease";

    res.status(200).json({ albums, totalDiff, percentageChange, changeType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ err: "No such Album" });
  }

  const album = await Album.findById(id)
    .populate("artist")
    .populate("featuredArtists")
    .populate("songList");

  if (!album) {
    return res.status(400).json({ err: "No such Album" });
  }

  res.status(200).json(album);
};

const createAlbum = async (req, res) => {
  try {
    const artist = await Artist.findOne({ email: req.body.artist });

    console.log(artist);

    if (!artist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    if (!req.body.featuredArtists) {
      const album = new Album({
        ...req.body,
        artist: artist._id,
      });

      album.songList = [];
      artist.albumList.push(album._id);

      await album.save();
      await artist.save();

      res.status(201).json(album);
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

      const album = new Album({
        ...req.body,
        artist: artist._id,
        featuredArtists: featuredArtists,
      });

      album.songList = [];
      artist.albumList.push(album._id);

      for (const featuredArtistId of featuredArtists) {
        const featuredArtist = await Artist.findById(featuredArtistId);
        featuredArtist.albumList.push(album._id);
        await featuredArtist.save();
      }

      await album.save();
      await artist.save();

      res.status(201).json(album);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

//WIP
const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { albumArt, albumName, artist, releaseYear, songList } = req.body;
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
    album.artist = artist;

    album.albumArt = albumArt;

    //adding a song into album songlist
    for (const song of songList) {
      const foundSong = await Song.findById(song);

      if (!foundSong) {
        return res.status(404).json({ error: "This song  doesn't exist" });
      }

      if (
        foundSong.album._id.toString() !== id &&
        !album.songList.includes(foundSong._id)
      ) {
        album.songList.push(foundSong._id);
        foundSong.album = album;
        await foundSong.save();
      }
    }

    //remove the song out of the album
    for (const song of album.songList) {
      if (!album.includes(song)) {
        const foundSong = await Song.findById(song);

        album.songList.pull(song);
        foundSong.album = null;
        await foundSong.save();
      }
    }

    const success = "Updated album successfully";
    await album.save();
    res.status(200).json({ album, success });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

//WIP
const deleteAlbum = async (req, res) => {
  const { id } = req.params;

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
    artist.albumList.pull(album._id);

    const albumSongs = await Song.find({ album: id });
    for (const song of albumSongs) {
      const aSong = await Song.findById(song);
      aSong.album = null;

      const featureArtistsSong = await Artist.find({
        songList: { $in: [albumSongs] },
      });

      for (const artist of featureArtistsSong) {
        const thatArtist = await Artist.findById(artist);
        thatArtist.songList.pull(aSong._id);
        thatArtist.albumList.pull(album._id);
        await thatArtist.save();
      }
      artist.songList.pull(aSong._id);
      await aSong.deleteOne({ _id: song });
      await artist.save();
    }

    await album.deleteOne({ _id: id });

    res.status(200).json(album);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getArtistAlbum = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Album is not available" });
  }

  const albums = await Album.find({ artist: id }).sort({ createdAt: -1 });
  if (!albums) {
    return res.status(404).json({ error: "You don't have any song" });
  }
  res.status(200).json(albums);
};

module.exports = {
  getAlbum,
  getAllAlbum,
  getArtistAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
