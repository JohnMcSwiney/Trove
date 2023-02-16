import mongoose from 'mongoose'

const AlbumSchema = new mongoose.Schema(
  {
    _id: {
        type: String,
        required: [true, `Please provide albums's id`],
        minLength: 16,
        maxLength: 16,
        unique: true
    },
    albumName:{
        type: String,
        required: [true, `Please provide album's name`],
        maxlength: 75,
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

export default mongoose.model('Album', AlbumSchema)
