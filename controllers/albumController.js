const Album = require("../models/album");


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