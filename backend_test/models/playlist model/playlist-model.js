const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {

    playlistName: {
      type: String,
      maxlength: 75,
      default: 'My Trove list'
    },
    playlistCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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