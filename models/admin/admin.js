const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    imageURL: {
      type: String,
    },

    adminName: {
      type: String,
      required: true,
    },

    curatedPlaylists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CuratedPlaylist",
        default: null,
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
