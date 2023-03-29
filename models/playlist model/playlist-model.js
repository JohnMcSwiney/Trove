const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {

    playlistName: {
      type: String,
      maxlength: 75,
      default: "My Trove List"
    },
    playlistCreator: {
      default: "Trove Music"
    },
    playlistCoverUrl: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    songList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
      }
    ]


  }

)
module.exports = mongoose.model('Playlist', playlistSchema);