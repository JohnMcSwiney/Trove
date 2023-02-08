import mongoose from 'mongoose'

const ArtistSchema = new mongoose.Schema(
  {
    _id: {
        type: String,
        required: [true, `Please provide artist's id`],
        minLength: 16,
        maxLength: 16,
        unique: true
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    artistName: {
        type: String,
        required: [true, `Please provide artist's name`],
        maxLength: 50
    },

    artistFollowers: {
        type: Number

    },
    albumArtist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    },
    albumArt: {
        type: String,
        data: Buffer
    },
    totalTracks: {
        type: Number,
        required: [true, `Please provide albums's length`]
    },
    isPublished: {
        type: Boolean
    },
    publishDate: {
        type: Date
    },
    releaseType: {
        type: String, 
        enum: ['Album', 'EP', 'Single']
    },
    albumSongs: {
        type: [Schema.Types.ObjectId],
        ref: 'Song'
    }

  }

)

export default mongoose.model('Artist', ArtistSchema)
