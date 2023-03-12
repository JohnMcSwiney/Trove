const mongoose = require('mongoose')

const discoveryGameSchema = new mongoose.Schema({

    songName: {

        type: String,
        required: true,
        minlength: 1
    },

    //not sure if we need array of genres?
    genre: {

        type: String,
        required: true
    },

    //not sure if we need array of album/song art?
    albumArt: {
        type: String,
        default: null
    },

    totalTracks: {
        type: Number,
        required: [true, `Please provide number of tracks`],
    },

    songList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Song",
            default: null
        }
    ],

    artistList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Artist",
            default: null
        }
    ],

    albumList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album",
        }
    ],

    isPublished: {
        type: Boolean,
        required: true
    },

    swipes: {
        type: Map,
        of: String
    },

    isLoved: {
        type: Boolean,
        default: false
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    similarity: {

        beat: {
            type: Number,
            required: true
        },
        tempo: {
            type: Number,
            required: true,
        }
    }

});

// const discoveryGameSchema = new mongoose.Schema({

//     songName: [{

//         type: String,
//         required: true,
//         minlength: 1
//     }],

//     //not sure if we need array of genres?
//     genre: [{

//         type: String,
//         required: true
//     }],

//     //not sure if we need array of album/song art?
//     albumArt: [{
//         type: String,
//         default: null
//     }],

//     totalTracks: {
//         type: Number,
//         required: [true, `Please provide number of tracks`],
//     },

//     songList: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref: "Song",
//             default: null
//         }
//     ],

//     artistList: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref: "Artist",
//             default: null
//         }
//     ],

//     albumList: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Album",
//         }
//     ],

//     isPublished: {
//         type: Boolean,
//         required: true
//     },

//     swipeLeft: {
//         type: Boolean,
//         required: true
//     },

//     swipeRight: {
//         type: Boolean,
//         required: true
//     },

//     isLoved: {
//         type: Boolean,
//         default: false
//     },

//     myTrove: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'MyTrove'
//     }

// });

module.exports = mongoose.model('DiscoveryGame', discoveryGameSchema);