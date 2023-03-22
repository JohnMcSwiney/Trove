const express = require("express");
const mongoose = require("mongoose");
const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
//mongoose.connection().artists.getIndexes()

//get all artists
const getAllArtist = async (req, res) => {
  const artists = await Artist.find({})
    .populate("songList", "title songUrl genre")
    .populate("albumList")
    // .populate('albumList')
    .sort({ createAt: -1 });
  res.status(200).json(artists);
};

//get an artist
const getAnArtist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such artist" });
  }

  const artist = await Artist.findById(id)
    .populate("songList")
    .populate("albumList");
  if (!artist) {
    return res.status(404).json({ message: "artist not found" });
  }
  res.status(200).json(artist);
};

//create an artist
const createArtist = async (req, res) => {
  try {
    const artist = new Artist(req.body);
    artist.songList = [];
    artist.albumList = [];

    await artist.save();

    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

//update an artist
const updateArtist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such artist" });
  }

  const artist = await Artist.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!artist) {
    return res.status(404).json({ message: err.message });
  }

  res.status(200).json(artist);
};

const updateGeneralInfo = async (req, res) => {
  const { id } = req.params;
  const { artistName, dob } = req.body;
  console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such artist" });
  }
  const updateArtist = await Artist.findOne({ _id: id });

  updateArtist.artistName = artistName;
  updateArtist.dob = dob;

  await updateArtist.save();
  res.status(200).json("Update info successfully");
};

const updateEmail = async (req, res) => {
  const { id } = req.params;
  const { currentEmail, newEmail, cPassword } = req.body;

  console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such artist" });
  }

  const artist = await Artist.findOne({ _id: id });

  const passwordMatch = await bcrypt.compare(cPassword, artist.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Password is not correct" });
  }

  const emailMatch = currentEmail === artist.email;
  if (!emailMatch) {
    return res.status(401).json({ error: "Email is not correct" });
  }

  artist.email = newEmail;
  await artist.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to: artist.email,
    subject: "Change email Successfully With TroveMusic Artist",
    html: `
            <p>Hi ${artist.email},</p>
            <p>Your action of changing email is successfully, let us know if you did not attempt to change email</p>
          `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.status(200).json({ message: "Email changed successfully" });
};

//update password

const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password, newPassword, confirmNewPassword } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such artist" });
  }
  try {
    const artist = await Artist.findById(id);
    console.log(artist.artistName);

    const passwordMatch = await bcrypt.compare(password, artist.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const matchConfirm = newPassword === confirmNewPassword;
    if (!matchConfirm) {
      return res
        .status(400)
        .json({ message: "Confirm password doesn't match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    artist.password = hash;
    await artist.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to: artist.email,
      subject: "Change Password Successfully With TroveMusic",
      html: `
            <p>Hi ${artist.email},</p>
            <p>Your action of changing password is successfully, let us know if you did not attempt to change password</p>
          `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Please try again" });
  }
};

//
const deleteArtist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such artist" });
  }

  const artist = await Artist.findOneAndDelete({ _id: id });

  if (!artist) {
    return res.status(404).json({ message: "Artist's not found" });
  }

  res.status(200).json(artist);
};

module.exports = {
  getAllArtist,
  getAnArtist,
  createArtist,
  updateArtist,
  deleteArtist,
  updateGeneralInfo,
  updateEmail,
  updatePassword,
};
