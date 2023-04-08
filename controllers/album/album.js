const mongoose = require("mongoose");
const Song = require("../../models/songs/song");
const Artist = require("../../models/artists/artist");
const Album = require("../../models/albums/album");
const nodemailer = require("nodemailer");
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
      return res.status(404).json({ error: "No such artist" });
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
            return res.status(404).json({ error: "No featured artist " });
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
        // thatArtist.albumList.pull(album._id);
        await thatArtist.save();
      }
      artist.songList.pull(aSong._id);
      await aSong.deleteOne({ _id: song });
      await artist.save();
    }

    await album.deleteOne({ _id: id });

    res.status(200).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
const getUnVerifiedAlbums = async (req, res) => {
  const albums = await Album.find({ isVerified: false, releaseType: "album" })
    .populate("artist")
    .populate("featuredArtists")
    .populate("songList")
    .sort({ createdAt: -1 });
  res.status(200).json(albums);
};

const approveAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Album is not available" });
    }

    const album = await Album.findById(id)
      .populate("artist")
      .populate("featuredArtists")
      .populate("songList");

    album.isVerified = true;
    albumSongs = album.songList;

    for (const songs of albumSongs) {
      const song = await Song.findById(songs);
      song.isVerified = true;
      await song.save();
    }

    const artistEmail = album.artist.email;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL_ACCOUNT,
      to: artistEmail,
      subject: "Song Approved",
      html: `
            <p>Hi ${album?.artist?.artistName},</p>
            <p>Thank you for upload album to TroveMusic!</p>
            <p>Your album is ready to be served for listeners.</p>
            <p>The Trove Music Team</p>
          `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    const success = "Album approved";
    await album.save();
    res.status(200).json({ album, success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const rejectAlbum = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Album is not available" });
    }

    const album = await Album.findById(id)
      .populate("artist")
      .populate("featuredArtists")
      .populate("songList");
    if (!album) {
      return res.status(404).json({ error: "You don't have any song" });
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
        // thatArtist.albumList.pull(album._id);
        await thatArtist.save();
      }
      artist.songList.pull(aSong._id);
      await aSong.deleteOne({ _id: song });
      await artist.save();
    }

    const artistEmail = album.artist.email;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL_ACCOUNT,
      to: artistEmail,
      subject: "Album Recjected",
      html: `
            <p>Hi ${album?.artist?.artistName},</p>
            <p>Thank you for upload album to TroveMusic!</p>
            <p>Your album is not qualified for listeners.</p>
            <p>Here are the reasons: </p>
            <p>${message}</p>
            <p>The Trove Music Team</p>
            
          `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await album.deleteOne({ _id: id });
    res.status(201).json({ message: "Rejected album" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getAlbum,
  getAllAlbum,
  getArtistAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getUnVerifiedAlbums,
  approveAlbum,
  rejectAlbum,
};
