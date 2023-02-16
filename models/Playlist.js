import mongoose from 'mongoose'

const PlaylistSchema = new mongoose.Schema(
  {
    _id: {
        type: String,
        required: [true, `Please provide playlist's id`],
        minLength: 16,
        maxLength: 16,
        unique: true
    },
    playlistName:{
        type: String,
        required: [true, `Please provide playlist's name`],
        maxlength: 75,
    },
    playlistDuration: {
        type: Number,
        required: [true, `Please provide playlist's duration`],
    },
    playlistCreator: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    isPublished: {
        type: Boolean
    },
    playlistSongs: {
        type: [Schema.Types.ObjectId],
        ref: 'Song'
    }
  }

)

export default mongoose.model('Playlist', PlaylistSchema)
