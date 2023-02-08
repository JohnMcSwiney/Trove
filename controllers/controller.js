const Song = require("../models/song");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { Readable } = require("stream");
const mongodb = require("mongoose").mongo;
const songDb = require("../database/db");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const { validate } = require("../models/song");
const { response } = require("express");
const bson = require("bson");
const { ObjectId } = require("mongodb").ObjectId;
const Binary = require('mongodb').Binary;
const crypto = require("crypto");
const path = require("path");

// const path = require("path");

// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });


// const connect = mongoose.connection;

// let gfs;

// connect.once("open", () => {

//     gfs = new mongoose.mongo.GridFSBucket(connect.db, {
//         bucketName: "songs"
//     });

// });

const uploadSong = async (request, response) => {


    Song.findOne({ _id: request.params.id })

        .then((result) => {

            if (result) {

                return response.status(200).json({ msg: "song already exists" });
            }
        });

    const { title, artist, album, songUrl, imageUrl, genre, year, duration } = request.body;

    //The album and artist will be taking in the id from the album and artist API.

    const song = new Song({

        title: title,

        artist: artist,

        genre: genre,

        album: album,

        songUrl: songUrl,

        imageUrl: imageUrl,

        year: year,

        duration: duration
    });

    await song.save()

        .then((result) => {

            console.log(result);
            console.log("post method working");

            response.status(201).json({
                message: "Song uploaded successfully!",
                song: result,
            });
        })

        .catch((err) => {
            console.log(err);
            response.status(500).json({
                error: err,
            });
        });
}


//get all songs
const getAllSongs = async (request, response) => {

    await Song.find().sort({ createdAt: -1 })

        .then((result) => {

            console.log(result);

            console.log("getAllSongs method working");

            response.status(200).json({ allSongs: result });

            return;
        })

        .catch((err) => {

            console.log(err);
            return response.status(500).json({ msg: "fetching songs failed" });
        });

}




//get song
const getSong = async (request, response) => {

    const { id } = request.params;

    const song = await Song.findById(id);

    if (!song) {

        return response.status(404).json({error: "Song not found"});
    }

    else {

        console.log(song);

        console.log("getOneSong method working");

        response.status(200).json(song);
    }

    // Song.findById(request.params.id)

    //     .exec()

    //     .then((song) => {

    //         console.log(song);

    //         console.log("song path: " + song.songFile.path);

    //         console.log("song filename: " + song.songFile.filename);

    //         console.log("image path: " + song.imageFile.path);

    //         console.log("image filename: " + song.imageFile.filename);

    //         if (!song) {

    //             return response.status(404).json({ msg: "song not found" });
    //         }

    //         if (!song.songFile.path || !song.songFile) {

    //             console.log(song.songFile.path);

    //             console.log("songFile.path is not valid");

    //             return response.status(500).json({ error: "songFile.path is not valid" });
    //         }

    //         if (!song.imageFile.path || !song.imageFile) {

    //             console.log(song.songFile.path);

    //             console.log("imageFile.path is not valid");

    //             return response.status(500).json({ error: "imageFile.path is not valid" });
    //         }

    //         let contentType = song.songFile.mimeType || 'audio/mpeg';

    //         response.set('Content-Type', contentType);
    //         response.set('Content-Length', song.songFile.size);
    //         response.set('Content-Disposition', 'inline; filename="' + song.songFile.filename + '"');
    //         response.set('Content-Transfer-Encoding', 'binary');
    //         response.sendFile(song.songFile.path, song.imageFile.path);
    //     })

    //     .catch((err) => {
    //         console.log(err);
    //         response.status(500).json({ err: err });
    //     });
}


//update song
const updateSong = async (request, response) => {

    const {id} = request.params;

    const song = await Song.findOneAndUpdate({ _id: id }, {

        ...request.body
    });

    if (!song) {

        return response.status(404).json({ error: "Song not found" });
    }
    else {

        console.log(song);

        console.log("updateSong method working");

        response.status(200).json(song);
    }
}





const deleteSong = async (request, response) => {

    const { id } = request.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {

    //     return response.status(404).json({ error: "song not founddsfsfssf" });
    // }
    // else {
    const song = await Song.findOneAndDelete({ _id: id })

    if (!song) {
        console.log("song not found");

        return response.status(404).json({ error: "song not found" });
    }
    else {
        console.log("song is deleted");

        response.status(200).json({ msg: "song deleted!" });
    }
    // }
}

module.exports = {
    getAllSongs,
    getSong,
    uploadSong,
    deleteSong,
    updateSong
}