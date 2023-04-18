const mongoose = require('mongoose');

const curatedPlaylistSchema = new mongoose.Schema(
  {

    curatedPlaylistName: {
      type: String,
      maxlength: 75,
      default: "My Trove List"
    },

    belongTo: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    curatedPlaylistCreator: {
      type: String,
      //default
      default: "Trove Music"
    },
    curatedPlaylistBio: {
      type: String,
      maxLength: 100,
      default: "generated playlist provided to you by Trove Music."
    },
    curatedPlaylistCoverUrl: {
      type: String,
     
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    isGenerated: {
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