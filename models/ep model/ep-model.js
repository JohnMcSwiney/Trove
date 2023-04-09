const mongoose = require("mongoose");

const epSchema = new mongoose.Schema({
  epName: {
    type: String,
    required: [true, `Please provide ep's name`],
    maxlength: 100,
  },

  epArt: {
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
      //length: 5
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

module.exports = mongoose.model("EP", epSchema);
