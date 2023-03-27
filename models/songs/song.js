const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `Please provide song's name`],
      maxlength: 75,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    genre: {
      type: String,
    },

    featuredArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        default: null,
      },
    ],

    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },

    ep: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EP",
      default: null,
    },

    // highlightStart: {
    //     type: Number
    // },

    // highlightStop: {
    //     type: Number
    // },

    duration: {
      type: Number,
      //required: true,
      minlength: 2,
      maxlength: 4,
    },

    beat: {
      type: Number,
      //required: true
    },

    tempo: {
      type: Number,
      //required: true
    },

    songUrl: {
      type: String,
      required: [true, `Please provide song`],
    },

    imgUrl: {
      type: String,
    },

    releaseYear: {
      type: Number,
    },
    //double check releaseType with album model, may conflict.
    releaseType: {
      type: String,
      enum: ["album", "ep", "single"],
    },

    isPublished: {
      type: Boolean,
    },

    isLoved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    searchCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
