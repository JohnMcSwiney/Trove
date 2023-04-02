const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    albumName: {
      type: String,
      required: [true, `Please provide album's name`],
      maxlength: 75,
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
      enum: ["Pop", "Rock", "Hiphop", "Country"],
    },

    featuredArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        default: null,
      },
    ],

    // totalTracks: {
    //   type: Number,
    //   default: 0,
    //   required: [true, `Please provide number of tracks`],
    // },

    isPublished: {
      type: Boolean,
      require: true,
    },

    releaseType: {
      type: [String],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);
