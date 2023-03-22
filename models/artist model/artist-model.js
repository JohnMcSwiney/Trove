const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const artistSchema = mongoose.Schema({
  artistName: {
    type: String,
    required: [true, `Please provide artist's name`],
    maxLength: 50,
  },

  bio: {
    type: String,
    maxLength: [250, "Max length is 250 words"],
  },

  artistImg: {
    type: String,
  },

  email: {
    type: String,
    required: [true, `Please provide email`],
    unique: true,
  },

  password: {
    type: String,
    required: [true, `Please provide password`],
  },

  dob: {
    type: Date,
  },

  gender: {
    type: String,
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

  epList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EP",
      default: null,
    },
  ],

  // provider: {
  //   type:String
  // },

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
