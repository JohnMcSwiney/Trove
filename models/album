const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({

    albumName:{
        type:String,
        required:[true,`Please provide album's name`],
        maxlength:75,
    },

    albumArt: {
            type:String,
    },

    totalTracks:{
        type:Number,
        required: [true, `Please provide number of tracks`],
    },

    isPublished:{
        type: Boolean,
        require:true
    },

    publishDate: {
        type:Date,
    },

    releaseType:{
        type:String,
        enum:['Album','EP','Single']
    },
    songList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song"
        }  
    ],

    artistList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist",
        }
    ]
        
    

})

module.exports = mongoose.model('Album',albumSchema);