const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({

    artistName: {
        type: String,
        required: [true, `Please provide artist's name`],
        maxLength: 50
    },

    userName: {
        type: String,
        required: [true, `Please provide username`]
    },

    email: {
        type: String,
        required: [true, `Please provide email`],
        unique: true
    },

    password: {
        type: String,
        required: [true, `Please provide password`],
    },
    artistFollowers: {
        type: Number
    },
    albumList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist',
            default: '',
        }
    ],
    albumArtURL: {
        type: String,
    },

    songList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song',
            default: '',
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

module.exports = mongoose.model('Artist', artistSchema)