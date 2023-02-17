const mongoose = require('mongoose')

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, `Please provide song's name`],
            maxlength: 75,
        },

        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist',
            required: true
        },

        genre: {
            type: String,
        },

        featuredArtists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Artist',
                default: null
            }
        ],

        album: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album',
            default: null,
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
            type: Number

        },

        releaseType: {
            type: String,
            enum: ['Album', 'EP', 'Single']
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