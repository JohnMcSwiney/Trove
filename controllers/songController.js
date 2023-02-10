const Song = require("../models/song");
const Album = require("../models/album");


const uploadSong = async (request, response) => {

    Album.findOne({title: request.body.album}, (err, foundAlbum) => {

        if (err) {

            response.status(500).send(err);
        }

        else if (!foundAlbum) {

            response.status(400).send("Album not found");
        }

        else {

            const { title, artist, album, songUrl, imageUrl, genre, year, duration } = request.body;

            //The album and artist will be taking in the id from the album and artist API.
        
            const song = new Song({
        
                title: title,
        
                artist: artist,
        
                genre: genre,
        
                album: foundAlbum._id,
        
                songUrl: songUrl,
        
                imageUrl: imageUrl,
        
                year: year,
        
                duration: duration
            });
        
            song.save()
        
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