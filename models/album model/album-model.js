const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  albumName: {
    type: String,
    required: [true, `Please provide album's name`],
    maxlength: 75,
  },

  albumArt: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/helical-analyst-376421.appspot.com/o/images%2FDefaultAlbumCover.png?alt=media&token=402df276-39d5-4d7f-9a82-9a7b06d91349",
  },

  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },

  featuredArtists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      default: null,
    },
  ],

  albumGenre: {
    type: String,
    required: [true, `Please provide album's genre`],
    enum: ["pop", "rock", "hiphop", "country"],
  },

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
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Album", albumSchema);
