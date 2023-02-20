const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: [] // dont know how to set different types of music
    }
})

module.exports = mongoose.model ('Genre', genreSchema);