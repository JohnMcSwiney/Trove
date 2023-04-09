const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  albumName: {
    type: String,
    required: [true, `Please provide album's name`],
    maxlength: 100,
  },

  albumArt: {
    type: String,
  },

  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },

  albumGenre: {
    type: String,
    required: [true, `Please provide album's genre`],
    enum: ["pop", "rock", "hiphop", "country"],
  },

  featuredArtists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      default: null,
    },
  ],

  isPublished: {
    type: Boolean,
    require: true,
  },

  publishDate: {
    type: Date,
  },

  releaseType: {
    type: String,
    enum: ["album", "ep", "single"],
  },
  releaseYear: {
    type: Number,
  },
  songList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      default: null,
    },
  ],
  searchCount: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Album", albumSchema);
