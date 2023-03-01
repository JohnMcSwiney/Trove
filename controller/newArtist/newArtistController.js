const Artist = require("../../models/artist model/artist-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleErrors = (error) => {
  console.log(err.message, error.code);
};

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1h" });
};

//Signup
const signupArtist = async (req, res) => {
  console.log(req.body);

  const {
    email,
    confirmEmail,
    password,
    confirmPassword,
    artistName,
    dob,
    gender,
  } = req.body;


  try {

    //const artist = Artist.findOne({ email: email });

    // if (artist) {
    //   return res.status(400).json({ error: "Artist email already exists" });
    // }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    
    const artist = await Artist.signup(req.body);
    const token = createToken(artist._id);
    res.json({
      token,
      artist: {
        id: artist._id,
        artistName: artist.artistName,
        email: artist.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//Login
const loginArtist = async (req, res) => {
  const { email, password } = req.body;

  try {
    const verify = await Artist.findOne({ email: email });

    if (verify == null) {
      return res.status(400).json({ err: "Email or password is not correct" });
    }
    const artist = await Artist.login(email, password);
    const token = createToken(artist._id);
    res.json({
      token,
      artist: {
        id: artist._id,
        artistName: artist.artistName,
        email: artist.email,
      },
    });
  } catch (error) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  loginArtist,
  signupArtist,
};
