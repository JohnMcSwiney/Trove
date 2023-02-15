const mongoose = require('mongoose')

const songSchema = new mongoose.Schema(
  {
    title:{
        type: String,
        required: [true, `Please provide song's name`],
        maxlength: 75,
    },
    genre: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref :'Genre' //have not create this model
        }
    ],
    artistList: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Artist',
        }
    ],
    albumList: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Album'
        }
    ],
    songUrl: {
        type: String,
        required: [true, `Please provide song`]
    },
    imgUrl: {
        type: String,
    },
    songYear: {
      type:Date,
      default: Date.now

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
  }, {timestamps: true}

);

module.exports = mongoose.model('Song',songSchema);