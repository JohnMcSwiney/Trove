const SongModel = require('../../models/song model/song-model')
const mongoose = require('mongoose')

const createSong = async (req, res) => {
    console.log('createSong',  req.body)
    const { title, genre, artist, contributingArtistList, album, highlightStart, highlightStop, songUrl, imgUrl, releaseYear, isPublished, isLoved} = req.body;
    //The album and artist will be taking in the id from the album and artist API.
    try {
        const song = new SongModel(req.body);
        await song.save()
        res.status(201).json(song);
    } catch (err) {
        console.log('err', err);
        res.status(500).json({
            error: err,
        });
    }
}


//get all songs
const getAllSongs = async (req, res) => {

    try {
        const songs = await SongModel.find({})
        .populate('contributingArtistList', 'artist')
        .populate('album')
        .sort({ createdAt: -1 })
        console.log("getAllSongs method working");
        res.status(200).json(songs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "fetching songs failed" });
    }
   

}


//get song
const getSong = async (request, response) => {

    const { id } = request.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'No such song'})
       }

    const song = await SongModel.findById(id)
    .populate('artistList', 'artistName ')

    if (!song) {

        return response.status(404).json({error: "Song not found"});
    }

    else {

        console.log(song);

        console.log("getOneSong method working");

        response.status(200).json(song);
    }
}


//update song
const updateSong = async (request, response) => {

    const {id} = request.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'No such song'})
       }

    const song = await SongModel.findOneAndUpdate({ _id: id }, {

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

    if (!mongoose.Types.ObjectId.isValid(id)) {

        return response.status(404).json({ error: "song not found" });
    }
    
    const song = await SongModel.findOneAndDelete({ _id: id })

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
    createSong,
    deleteSong,
    updateSong
}