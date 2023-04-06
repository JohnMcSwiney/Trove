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

    highlightStart: {
      type: Number,
    },

    highlightStop: {
      type: Number,
    },

    songUrl: {
      type: String,
      required: [true, `Please provide song/songs`],
    },

    imgUrl: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/helical-analyst-376421.appspot.com/o/images%2FDefaultAlbumCover.png?alt=media&token=402df276-39d5-4d7f-9a82-9a7b06d91349",
    },

    releaseYear: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear(),
        required: [true, 'Please provide a valid release year'],
        get: (v) => Math.round(v), // Round the number to remove decimal places
        set: (v) => Math.round(v), // Round the number to remove decimal places
      
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
