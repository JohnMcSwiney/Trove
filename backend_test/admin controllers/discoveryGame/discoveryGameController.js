const express = require('express');
const { default: mongoose } = require('mongoose');
const DiscoveryGame = require('../../models/discoveryGame model/discoveryGame-model');
const Song = require('../../models/song model/song-model');


//get discovery game
const getDiscoveryGame = async (req, res) => {

    //what should happen is when the game is loaded it'll just load a random song from the list.
}


//create an artist
const uploadToDiscoveryGame = async (req, res) => {

    Song.findOne({ title: req.body.song }, (err, foundSong) => {

        if (err) {
            res.status(500).send(err);
        }
        else if (!foundSong) {
            res.status(400).send("Song not found");
        } else {
            const { songName, genre, albumArt, totalTracks, songList, artistList, isPublished, swipeLeft, swipeRight, isLoved, tasteProfile} = req.body;
            try {
                const discoveryGame = new DiscoveryGame(req.body);
                discoveryGame.save()
                res.status(201).json(discoveryGame);
            } catch (err) {
                console.log('err', err);
                res.status(500).json({
                    error: err,
                });
            }
        }
    });
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

    if (!artist) {
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