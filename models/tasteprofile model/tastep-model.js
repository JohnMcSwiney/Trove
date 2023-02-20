const mongoose =require('mongoose')

const tasteProfileSchema = new mongoose.Schema(
  {
    tasteOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likedSongs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song"
        }
    ],
    dislikedSongs:[
        {
            type: [mongoose.Schema.Types.ObjectId], 
            ref: 'Song'
        }
    ] ,
    likedGenres: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Genre'
        }
    ],
  }

)
    module.exports = mongoose.model('TasteProfile',tasteProfileSchema)
