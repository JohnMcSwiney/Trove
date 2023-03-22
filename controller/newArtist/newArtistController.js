const Artist = require("../../models/artist model/artist-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookie = require("js-cookie");
const maskEmailsPhones = require("mask-email-phone");
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1h" });
};

//Signup
const signupArtist = async (req, res) => {
  const { email, confirmEmail, password, artistName, dob, gender } = req.body;

  try {
    if (email !== confirmEmail) {
      return res.status(400).json({ error: "Emails do not match" });
    }

    const emailCheck = await Artist.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ error: "Email already in use" });
    }

    if (!email || !password || !artistName || !dob || !gender) {
      throw Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const artist = await Artist.create({
      email,
      password: hash,
      artistName,
      dob,
      gender,
    });

    const hashEmail = maskEmailsPhones(artist.email);
    const artistInfo = {
      email: hashEmail,
      password: hash,
      artistName,
      dob,
      gender,
    };
    console.log(hashEmail);
    res.cookie("artist", artist, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 86400 * 1000),
    }); // Set the cookie to expire in 1 day     });

    const token = createToken(artist._id);
    req.session.artist = artist;
    res.json({
      email,
      token,
      id: artist._id,
      artistName: artist.artistName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//Login
const loginArtist = async (req, res) => {
  const { email, password } = req.body;

  try {
    const artist = await Artist.findOne({ email: email });
    if (!artist) {
      return res
        .status(400)
        .json({ error: "You have not sign up with this email" });
    }
    await Artist.login(email, password);
    const token = createToken(artist._id);
    req.session.artist = artist; // Set the session here

    const hashEmail = maskEmailsPhones(email);
    const artistInfo = {
      email: hashEmail,
      token,
      id: artist._id,
      artistName: artist.artistName,
    };

    res.cookie("artist", artistInfo, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 86400 * 1000),
    });

    res.json({
      token,
      id: artist._id,
      artistName: artist.artistName,
      email: artist.email,
      albumList: artist.albumList,
      epList: artist.epList,
      songList: artist.songList,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//log out

const logoutArtist = (req, res) => {
  res.clearCookie("artist");

  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err: "Server error" });
    } else {
      res.send("Logged out successfully");
    }
  });
};

module.exports = {
  loginArtist,
  signupArtist,
  logoutArtist,
};
