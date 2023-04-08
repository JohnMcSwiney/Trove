const mongoose = require("mongoose");
const Song = require("../../models/songs/song");
const Artist = require("../../models/artists/artist");
const Album = require("../../models/albums/album");
const EP = require("../../models/ep/ep");
const artist = require("../../models/artists/artist");
const nodemailer = require("nodemailer");
const getAllEP = async (req, res) => {
  const eps = await EP.find({})
    .populate("songList")
    .populate("featuredArtists")
    .populate("artist")
    .populate("songList")
    .sort({ createdAt: -1 });
  res.status(200).json(eps);
};

const getEP = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such EP" });
  }

  const ep = await EP.findById(id)
    .populate("songList")
    .populate("featuredArtists")
    .populate("artist")
    .populate("songList");

  if (!ep) {
    return res.status(400).json({ error: "No such EP" });
  }

  res.status(200).json(ep);
};

const createEP = async (req, res) => {
  const artistID = req.body.artistID;
  try {
    const artist = await Artist.findOne({ _id: artistID });

    if (!artist) {
      return res.status(404).json({ error: "No such artist " });
    }

    if (!req.body.featuredArtists || req.body.featuredArtists == null) {
      const ep = new EP({
        ...req.body,
        artist: artist._id,
      });

      ep.songList = [];
      artist.epList.push(ep._id);

      await ep.save();
      await artist.save();

      res.status(201).json(ep);
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

      const ep = new EP({
        ...req.body,
        artist: artist._id,
        featuredArtists: featuredArtists,
      });

      ep.songList = [];
      artist.epList.push(ep._id);

      for (const featuredArtistId of featuredArtists) {
        const featuredArtist = await Artist.findById(featuredArtistId);
        featuredArtist.epList.push(ep._id);
        await featuredArtist.save();
      }

      await ep.save();
      await artist.save();

      res.status(201).json(ep);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//WIP
const updateEP = async (req, res) => {
  const { id } = req.params;
  const { epArt, epName, artist, releaseYear, songList, genre } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ep" });
  }

  try {
    const ep = await EP.findById(id);

    if (!ep) {
      res.status(404).json({ error: "ep is not available" });
    }

    const epArtist = await Artist.findById(artist);

    if (!epArtist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    ep.epArt = epArt;
    ep.epName = epName;
    ep.releaseYear = releaseYear;
    ep.epGenre = genre;
    ep.artist = epArtist;

    const songListIDs = songList && songList.map((item) => item._id || []);
    if (songListIDs.length > 5) {
      res.status(500).json({ error: "EP can contain max to 5 songs" });
    }

    //adding song to songList
    for (const songs of songList) {
      const foundSong = await Song.findById(songs);

      if (!foundSong) {
        return res.status(404).json({ error: "This song  doesn't exist" });
      }

      if (
        foundSong.ep === null ||
        (foundSong.ep._id.toString() !== id &&
          !ep.songList.includes(foundSong._id))
      ) {
        ep.songList.push(foundSong._id);
        foundSong.ep = ep;
        foundSong.releaseType = "ep";
        await foundSong.save();
      }
    }

    //remove

    if (songList.length === 0) {
      const epSongs = await Song.find({ ep: id });

      for (const song of epSongs) {
        song.ep = null;
        song.releaseType = "single";
        ep.songList = [];
        await song.save();
      }
    } else {
      for (const songs of ep.songList) {
        if (!songListIDs.includes(songs.toString())) {
          ep.songList.pull(songs);
          const foundSong = await Song.findById(songs);

          foundSong.ep = null;
          foundSong.releaseType = "single";
          await foundSong.save();
        }
      }
    }
    ep.songList = songList;
    const success = "Updated ep successfully";
    await ep.save();
    res.status(200).json({ ep, success });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyEP = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "EP does not exist" });
  }

  const eps = await EP.find({ artist: id }).sort({ createdAt: -1 });
  if (!eps) {
    return res.status(404).json({ error: "You don't have any song" });
  }
  res.status(200).json(eps);
};

const deleteEP = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ep" });
  }

  try {
    const ep = await EP.findById(id);

    if (!ep) {
      throw new Error("ep not found");
    }

    const artist = await Artist.findOne({ _id: ep.artist._id });

    if (!artist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    artist.epList.pull(ep._id);

    const epSongs = await Song.find({ ep: id });

    for (const song of epSongs) {
      const aSong = await Song.findById(song);
      aSong.ep = null;
      const featureArtistsSong = await Artist.find({
        songList: { $in: [epSongs] },
      });

      for (const artist of featureArtistsSong) {
        const thatArtist = await Artist.findById(artist);
        thatArtist.songList.pull(aSong._id);
        // thatArtist.epList.pull(ep._id);
        await thatArtist.save();
      }
      artist.songList.pull(aSong._id);
      await aSong.deleteOne({ _id: song });
      await artist.save();
    }

    if (!ep) {
      return res.status(404).json({ error: "No such ep" });
    }
    await ep.deleteOne({ _id: id });
    res.status(200).json(ep);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
const getUnVerifiedEPs = async (req, res) => {
  const eps = await EP.find({ isVerified: false, releaseType: "ep" })
    .populate("artist")
    .populate("featuredArtists")
    .populate("songList")

    .sort({ createdAt: -1 });
  res.status(200).json(eps);
};

const approveEP = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Album is not available" });
    }

    const ep = await EP.findById(id)
      .populate("artist")
      .populate("featuredArtists")
      .populate("songList");

    ep.isVerified = true;

    for (const songs of ep.songList) {
      const song = await Song.findById(songs);
      song.isVerified = true;
      await song.save();
    }

    const artistEmail = ep.artist.email;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL_ACCOUNT,
      to: artistEmail,
      subject: "EP Approved",
      html: `
            <p>Hi ${ep?.artist?.artistName},</p>
            <p>Thank you for upload ep to TroveMusic!</p>
            <p>Your ep is ready to be served for listeners.</p>
            <p>The Trove Music Team</p>
          `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    const success = "ep approved";
    await ep.save();
    res.status(200).json({ ep, success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const rejectEP = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "EP is not available" });
    }

    const ep = await EP.findById(id)
      .populate("artist")
      .populate("featuredArtists")
      .populate("songList");
    if (!ep) {
      return res.status(404).json({ error: "You don't have any song" });
    }

    const artist = await Artist.findOne({ _id: ep.artist._id });
    if (!artist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }
    artist.epList.pull(ep._id);

    const epSongs = await Song.find({ ep: id });
    for (const song of epSongs) {
      const aSong = await Song.findById(song);
      aSong.ep = null;

      const featureArtistsSong = await Artist.find({
        songList: { $in: [epSongs] },
      });

      for (const artist of featureArtistsSong) {
        const thatArtist = await Artist.findById(artist);
        thatArtist.songList.pull(aSong._id);
        // thatArtist.epList.pull(ep._id);
        await thatArtist.save();
      }
      artist.songList.pull(aSong._id);
      await aSong.deleteOne({ _id: song });
      await artist.save();
    }

    const artistEmail = ep.artist.email;
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
            <p>Hi ${ep?.artist?.artistName},</p>
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

    await ep.deleteOne({ _id: id });
    res.status(201).json({ message: "EP rejected" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getEP,
  getMyEP,
  getAllEP,
  createEP,
  updateEP,
  deleteEP,
  getUnVerifiedEPs,
  approveEP,
  rejectEP,
};
