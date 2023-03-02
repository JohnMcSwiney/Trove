const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const artistSchema = mongoose.Schema({
  artistName: {
    type: String,
    maxLength: 50,
    required: [true, `Please provide your name or nickname`],
  },

  email: {
    type: String,
    required: [true, `Please provide email`],
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isArtist: {
    type: Boolean,
    default: false,
  },
  artistFollowers: {
    type: Number,
  },
  albumList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      default: null,
    },
  ],
  albumArtURL: {
    type: String,
  },

  songList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      default: null,
    },
  ],
  isPublished: {
    type: Boolean,
  },
  publishDate: {
    type: Date,
  },

  dob: {
    type: Date,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
});

//static methods

//static methods for login

artistSchema.statics.login = async function (email, password) {
  if (!password || !email) {
    throw Error("Please fill both to login");
  }

  const artist = await this.findOne({ email });

  if (!artist) {
    throw Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, artist.password);

  if (!match) {
    throw Error("Incorrect email or password");
  }

  return artist;
};

module.exports = mongoose.model("Artist", artistSchema);
