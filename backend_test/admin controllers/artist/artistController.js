const express = require('express');
const { default: mongoose } = require('mongoose');
const Song = require('../../models/song model/song-model')
const Artist = require('../../models/artist model/artist-model')
const Album = require('../../models/album model/album-model')

//get all artists
const getAllArtist = async (req, res) => {
    const artists = await Artist.find({})
        .populate('songList', 'title songUrl genre')
        .populate('albumList')
        // .populate('albumList')
        .sort({ createAt: -1 });
    res.status(200).json(artists);
}

//get an artist
const getAnArtist = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No such artist' })
    }

    const artist = await Artist.findById(id)
        .populate('songList')
    // .populate('albumList')
    if (!artist) {
        return res.status(404).json({ message: err.message });
    }
    res.status(200).json(artist)
}

//create an artist
const createArtist = async (req, res) => {

    Song.findOne({ title: req.body.song }, async (err, foundSong) => {

        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else if (!foundSong) {
            //console.log(err);
            console.log("there are no songs")
            //res.status(400).send("Songs not found");

            Album.findOne({ albumName: req.body.album}, async (err, foundAlbum) => {

                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else if (!foundAlbum) {
                    console.log(err);
                    console.log("there is no album");
                    const {
                        email,
                        password,
                        artistName,
                        artistFollowers,
                        albumArtURL,
                        isPublished,
                        publishDate,
                        albumList,
                        songList
                    } = req.body
                    try {
                        const artist = await Artist.create(req.body)
                        res.status(200).json(artist);
                    } catch (err) {
                        res.status(400).json({ message: err.message })
                    }
                    //res.status(400).send("Album not found");
                }
            });
        }
    });
}

//update an artist
const updateArtist = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No such artist' })
    }

    const artist = await Artist.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!artist) {
        return res.status(404).json({ message: err.message });
    }

    res.status(200).json(artist);
}

//
const deleteArtist = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No such artist' })
    }

    const artist = await Artist.findOneAndDelete({ _id: id });

    if (!artist) {
        return res.status(404).json({ message: "Artist's not found" });
    }

    res.status(200).json(artist)
}

module.exports = {
    getAllArtist,
    getAnArtist,
    createArtist,
    updateArtist,
    deleteArtist
}