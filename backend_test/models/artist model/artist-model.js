const mongoose = require("mongoose");

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

module.exports = mongoose.model("Artist", artistSchema);
