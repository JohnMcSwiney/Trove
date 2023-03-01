const Artist = require("../../models/artist model/artist-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

    const artist = await Artist.signup(req.body);
    const token = createToken(artist._id);
    req.session.artist = artist; // Set the session here
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

  console.log(email);
  try {
    const artist = await Artist.findOne({ email: email });
    console.log(artist);
    if (!artist) {
      return res.status(400).json({ err: "Email or password is not correct" });
    }
    await Artist.login(email, password);
    const token = createToken(artist._id);
    req.session.artist = artist; // Set the session here
    res.json({
      token,
      id: artist._id,
      artistName: artist.artistName,
      email: artist.email,
    });
  } catch (error) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  loginArtist,
  signupArtist,
};
