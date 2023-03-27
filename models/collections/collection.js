const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    maxlength: 75,
    default: "My Trove list",
  },

  collectionImg: {
    type: String,
  },

  collectionDescription: {
    type: String,
  },
  songlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

module.exports = mongoose.model("Collection", collectionSchema);
