const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
        
        artistName: {
            type: String,
            required: [true, `Please provide artist's name`],
            maxLength: 50
        },
        
        email:{
            type:String,
            required: true,
            unique: true
        },

        password: {
            type:String,
            required:true
        },
        artistFollowers: {
            type: Number
        },
        albumList:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Artist',
                default: null,
                required: false
            }
        ],
        albumArtURL: {
            type: String,
        },

        songList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Song',
                default: null,
                required: false

            }
        ],
        isPublished: {
            type: Boolean
        },
        publishDate: {
            type: Date
        }
      }
    
    )
    
module.exports = mongoose.model('Artist',artistSchema)