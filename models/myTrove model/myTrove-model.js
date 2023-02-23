const mongoose = require('mongoose')

const myTroveSchema = new mongoose.Schema(
    {
        myTroveOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        likedSongs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
                validate: {
                    validator: async (v) => {

                        if (v) {
                            const song = await mongoose.model('Song').findById(v);
                            return song !== null;
                        }
                        return true;
                    },
                    message: 'Invalid song ID'
                }
            }
        ],
        dislikedSongs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
                validate: {
                    validator: async (v) => {

                        if (v) {
                            const song = await mongoose.model('Song').findById(v);
                            return song !== null;
                        }
                        return true;
                    },
                    message: 'Invalid song ID'
                }
            }
        ],
        likedGenres: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Genre'
            }
        ],
    }

)
module.exports = mongoose.model('MyTrove', myTroveSchema)
