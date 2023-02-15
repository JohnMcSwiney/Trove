const mongoose = require('mongoose')

const discoveryGameSchema = new mongoose.Schema({

    songName: {

        type: String
    },

    //not sure if we need array of genres?
    genre: {
        type: String
    },

    //not sure if we need array of album/song art?
    albumArt: {
            type:String,
    },

    totalTracks:{
        type:Number,
        required: [true, `Please provide number of tracks`],
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
    ],

    isPublished:{
        type: Boolean,
        required:true
    },

    swipeLeft: {
        type: Boolean,
        required: true
    },

    swipeRight: {
        type: Boolean,
        required: true
    },
    
    isLoved: {
        type: Boolean,
    },

    tasteProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TasteProfile'
    }

});

module.exports = mongoose.model('DiscoveryGame',discoveryGameSchema);