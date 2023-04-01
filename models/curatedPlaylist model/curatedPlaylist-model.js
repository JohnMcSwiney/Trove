const mongoose = require('mongoose');

const curatedPlaylistSchema = new mongoose.Schema(
  {

    curatedPlaylistName: {
      type: String,
      maxlength: 75,
      default: "My Trove List"
    },
    curatedPlaylistCreator: {
      type: String,
      //default
      default: "Trove Music"
    },
    curatedPlaylistCoverUrl: {
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
module.exports = mongoose.model('CuratedPlaylist', curatedPlaylistSchema);