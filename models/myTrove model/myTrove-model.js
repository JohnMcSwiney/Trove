const mongoose = require('mongoose')

const myTroveSchema = new mongoose.Schema(
    {
        myTroveOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        playlists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Playlist"
            },
        ],

        recentTrack: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Songs"
            }
        ],

        likedSongs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song"
                // validate: {
                //     validator: async (v) => {

                //         if (v) {
                //             const song = await mongoose.model('Song').findById(v);
                //             return song !== null;
                //         }
                //         return true;
                //     },
                //     message: 'Invalid song ID'
                // }
            }
        ],
    }

)
module.exports = mongoose.model('MyTrove', myTroveSchema)
