const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({

    albumName: {
        type: String,
        required: [true, `Please provide album's name`],
        maxlength: 75,
    },

    albumArt: {
        type: String,
    },

    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },

    contributingArtistList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist",
        }
    ],

    totalTracks: {
        type: Number,
        required: [true, `Please provide number of tracks`],
    },

    isPublished: {
        type: Boolean,
        require: true
    },

    publishDate: {
        type: Date,
    },

    releaseType: {
        type: String,
        enum: ['Album', 'EP', 'Single']
    },
    releaseYear: {
        type: Number
    },
    songList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song"
        }
    ]
})

module.exports = mongoose.model('Album', albumSchema);