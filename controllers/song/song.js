const Song = require("../../models/songs/song");
const Artist = require("../../models/artists/artist");
const Album = require("../../models/albums/album");
const EP = require("../../models/ep/ep");
const mongoose = require("mongoose");
const { json } = require("express");
const song = require("../../models/songs/song");
const nodemailer = require("nodemailer");
const createSong = async (req, res) => {
  console.log("createSong", req.body);

  switch (req.body.releaseType) {
    case "album" || "ep":
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
            releaseType: "album",
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
            releaseType: "album",
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

    case "single":
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
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
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

      .populate("ep")
      .sort({ createdAt: -1 });

    res.status(200).json(songs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "fetching songs failed" });
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

    const songListOfArtists = await Artist.find({
      songList: { $in: [id] },
    });

    if (!songListOfArtists) {
      throw new Error("None of the artist has this song");
    }
    // delete the song from each artist's songList
    for (const artist of songListOfArtists) {
      await Artist.updateMany({ _id: artist._id }, { $pull: { songList: id } });
    }

    const albums = await Album.find({ songList: { $in: [id] } });
    for (const album of albums) {
      await Album.updateMany({ _id: album._id }, { $pull: { songList: id } });
    }

    const eps = await EP.find({ songList: { $in: [id] } });
    for (const ep of eps) {
      await EP.updateMany({ _id: ep._id }, { $pull: { songList: id } });
    }
    // delete the song itself
    await Song.findByIdAndDelete(id);
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

const getUnVerifiedSongs = async (req, res) => {
  try {
    const songs = await Song.find({ isVerified: false, releaseType: "single" })

      .populate("artist")
      .populate("featuredArtists")

      .populate("album")

      .populate("ep")
      .sort({ createdAt: -1 });

    res.status(200).json(songs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "fetching songs failed" });
  }
};
const approveSong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "song not found" });
  }
  try {
    const foundSong = await Song.findById(id)
      .populate("artist")
      .populate("featuredArtists")
      .populate("album")
      .populate("ep");
    if (!foundSong) {
      return res.status(404).json({ error: "song not found" });
    }

    const artistEmail = foundSong.artist.email;
    foundSong.isVerified = true;
    await foundSong.save();

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
            <p>Hi ${foundSong?.artist?.artistName},</p>
            <p>Thank you for upload song to TroveMusic!</p>
            <p>The song "${foundSong.title}" has been approved.</p>
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
    const success = "Song approved";
    res.status(200).json({ foundSong, success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const rejectSingle = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "song not found" });
  }

  try {
    const song = await Song.findById(id)
      .populate("artist")
      .populate("featuredArtists");

    const songListOfArtists = await Artist.find({
      songList: { $in: [id] },
    });

    if (!songListOfArtists) {
      throw new Error("None of the artist has this song");
    }
    // delete the song from each artist's songList
    for (const artist of songListOfArtists) {
      await Artist.updateMany({ _id: artist._id }, { $pull: { songList: id } });
    }

    const albums = await Album.find({ songList: { $in: [id] } });
    for (const album of albums) {
      await Album.updateMany({ _id: album._id }, { $pull: { songList: id } });
    }

    const eps = await EP.find({ songList: { $in: [id] } });
    for (const ep of eps) {
      await EP.updateMany({ _id: ep._id }, { $pull: { songList: id } });
    }

    const artistEmail = song.artist.email;
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
      subject: "EP Recjected",
      html: `
            <p>Hi ${song?.artist?.artistName},</p>
            <p>Thank you for upload song to TroveMusic!</p>
            <p>Your song is not qualified for listeners.</p>
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

    // delete the song itself
    await Song.findByIdAndDelete(id);

    res.status(200).json({ msg: "song deleted!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllSongs,
  getSong,
  getArtistSong,
  createSong,
  deleteSong,
  updateSong,
  getUnVerifiedSongs,
  approveSong,
  rejectSingle,
};
