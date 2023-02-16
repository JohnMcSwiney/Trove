const mongoose = require('mongoose')

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, `Please provide song's name`],
            maxlength: 75,
        },

        genre: {
            type: String,

        },

        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        },

        contributingArtistList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Artist',
            }
        ],

        album: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album'
        },

        highlightStart: {
            type: Number
        },

        highlightStop: {
            type: Number
        },

        songUrl: {
            type: String,
            required: [true, `Please provide song`]
        },

        imgUrl: {
            type: String,
        },

        releaseYear: {
            type: String

        },

        isPublished: {
            type: Boolean
        },

        isLoved: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }, { timestamps: true }

);

module.exports = mongoose.model('Song', songSchema);