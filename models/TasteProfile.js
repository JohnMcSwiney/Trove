import mongoose from 'mongoose'

const TasteProfileSchema = new mongoose.Schema(
  {
    _id: {
        type: String,
        required: [true, `Please provide taste profile's id`],
        minLength: 16,
        maxLength: 16,
        unique: true
    },
    profileOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likedSongs: {
        type: [Schema.Types.ObjectId],
        ref: 'Song'
    },
    dislikedSongs: {
        type: [Schema.Types.ObjectId], 
        ref: 'Song'
    },
    likedGenres: {
        
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

export default mongoose.model('TasteProfile', TasteProfileSchema)
