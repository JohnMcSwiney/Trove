const express = require('express');
const { default: mongoose } = require('mongoose');
const { client } = require('taste-dive-api');
const songMetadata = require('song-metadata');
const DiscoveryGame = require('../../models/discoveryGame model/discoveryGame-model');
const Song = require('../../models/song model/song-model');
const Artist = require('../../models/artist model/artist-model');
const Album = require('../../models/album model/album-model');
const User = require('../../models/user model/user-model');
const MyTrove = require('../../models/myTrove model/myTrove-model');



//get discovery game
const getDiscoveryGame = async (req, res) => {

    //what should happen is when the game is loaded it'll just load a random song from the list.

    try {


        const myTrove = await MyTrove.findOne({
            myTroveOwner: req.user._id
        });

        // const recommendedSongs = await songMetadata.getRecommendations(myTrove);

        // let song;

        // for (let i = 0; i < recommendedSongs.length; i++) {

        //     const recommendedSong = recommendedSongs[i];
        //     const metadata = await songMetadata.getSongMetaData(recommendedSong.id);

        //     if (!metadata) {
        //         continue;
        //     }

        //     const similarity = calculateSongSimilarity(metadata, myTrove);

        //     if (similarity >= 0.5) {
        //         const existingSwipe = myTrove.swipes.find(swipe => swipe.song === recommendedSong.id);

        //         if (!existingSwipe) {
        //             song = { ...recommendedSong, metadata };
        //             break;
        //         }
        //     }

        // }

        // const likedSongs = myTrove.swipes.filter(
        //     swipe => swipe.direction === 'right'
        //     .map(swipe => swipe.song)
        //     )

        //     const userPreferences = {
        //         tempo: myTrove.pr
        //     }

        const song = await DiscoveryGame.findOne({
            genre: {$in: myTrove.likedSongs},
            tempo: {$gte: myTrove.minTempo, $lte: myTrove.maxTempo},
            //isLoved: true,
            isPublished: true,
            _id: {$nin: myTrove.swipes.map(swipe => swipe.song)}

        })
        .populate('myTrove', ['genres']);

        if (!song || song == null) {
            console.log("song not found");

            return res.status(200).json({});
        }

        res.status(200).json(song);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}


//WIP
const uploadToDiscoveryGame = async (req, res) => {

    // const { songId, direction } = req.body;

    // try {

    //     const myTrove = await MyTrove.findOne({
    //         myTroveOwner: req.user._id
    //     });

    //     const existingSwipe = myTrove.swipes.find(swipe => swipe.song === songId);

    //     if (existingSwipe) {
    //         return res.status(400).json({ msg: 'already swiped on this song' });
    //     }

    //     myTrove.swipes.push({ song: songId, direction });

    //     await myTrove.save();

    //     const discoveryGame = await DiscoveryGame.findOne({ songList: songId });

    //     if (discoveryGame) {
    //         if (direction === 'like' || 'right') {

    //             discoveryGame.swipes.set(songId, 'like');
    //         }
    //         else if (direction === 'dislike' || 'left') {

    //             discoveryGame.swipes.set(songId, 'dislike');
    //         }

    //         await discoveryGame.save();

    //         // const swipe = myTrove.swipes.find(
    //         //     swipe => swipe.song.toString() === songId
    //         // );

    //         // if (swipe) {
    //         //     return res.status(400).json({ msg: 'alread swiped on this song' });
    //         // }

    //         // myTrove.swipes.push({ song: songId, direction });
    //         // await myTrove.save();

    //         // await DiscoveryGame.updateOne(
    //         //     { _id: songId },
    //         //     { $inc: { [`swipeCount.${direction}`]: 1 } }
    //         // );
    //     }
    //     res.status(200).send('swiped');
    // } catch (err) {

    //     console.log(err);
    //     res.status(500).send('server error');
    // }
//TESTING DIFFERENT IMPLEMENTATIONS

const {myTroveId, songId, swipeDirection} = req.body;

const troveUser = await myTrove.findById(myTroveId);

if (!troveUser) {

    return res.status(404).send('MyTrove profile not found');
}

const song = await Song.findById(songId);

if (!song) {

    return res.status(404).send('Song not found');
}

const audioContext = new AudioContext();

const response = await fetch(song);
const songData = await response.arrayBuffer();
const songBuffer = await audioContext.decodeAudioData(songData);

const beatDetector = new BeatDetector(audioContext);
const source = audioContext.createBufferSource();
source.buffer = songBuffer;
source.connect(beatDetector);
beatDetector.connect(audioContext.destination);

const tempo = await beatDetector.getTempo();
const beat = await beatDetector.getBeat();

if (swipeDirection === 'left') {
    
    const nextSong = await getNextSong(troveUser);
    res.send(nextSong);

    async function getNextSong(troveUser) {

        const troveUser = await MyTrove.findById(troveUser).populate({
            path: 'myTrove.likedSongs',
            options: {sort: {createdAt: -1}},
            limit: 1
        });
    }
}

else {
    troveUser.likedSongs.push(songId);
}

// const nextSong = await getNextSong(troveUser);
// res.send(nextSong);

// async function getNextSong(troveUser) {

//     const troveUser = await MyTrove.findById(troveUser).populate({
//         path: 'myTrove.likedSongs',
//         options: {sort: {createdAt: -1}},
//         limit: 1
//     });
// }

const lastlikedSong = troveUser.likedSongs[0];

const similarSongs = await Song.find({
    $and: [
        {_id: {$ne: lastlikedSong._id}},
        {genre: lastlikedSong.genre},
        {'similarity.beat' : {$gte: lastlikedSong.similarity.beat - 0.1, $lte: lastlikedSong.similarity.beat + 0.1}},
        {'similarity.tempo' : {$gte: lastlikedSong.similarity.tempo - 5, $lte: lastlikedSong.similarity.tempo + 5}}
    ]
}).limit(10);

const nextSong = similarSongs[Math.floor(Math.random() * similarSongs.length)];
return nextSong;



}

//update an artist
const updateDiscoveryGame = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No such song' })
    }

    const song = await Song.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!song) {
        return res.status(404).json({ message: err.message });
    }

    res.status(200).json(song);
}

//
const deleteFromDiscoveryGame = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No such song' })
    }

    const song = await Song.findOneAndDelete({ _id: id });

    if (!song) {
        return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(song)
}

module.exports = {
    getDiscoveryGame,
    getOneDiscoveryGame,
    uploadToDiscoveryGame,
    updateDiscoveryGame,
    deleteFromDiscoveryGame
}