const Album = require("../models/album");


const createAlbum = async (request, response) => {


    Album.findOne({ _id: request.params.id })

        .then((result) => {

            if (result) {

                return response.status(200).json({ msg: "album already exists" });
            }
        });

    const { title, artist, imageUrl, year} = request.body;

    //The album and artist will be taking in the id from the album and artist API.

    const album = new Album({

        title: title,

        artist: artist,

        imageUrl: imageUrl,

        year: year

    });

    await album.save()

        .then((result) => {

            console.log(result);
            console.log("post method working");

            response.status(201).json({
                message: "Album uploaded successfully!",
                album: result,
            });
        })

        .catch((err) => {
            console.log(err);
            response.status(500).json({
                error: err,
            });
        });
}

module.exports = {
    createAlbum
}