const Song = require('../../models/song model/song-model')
const Artist = require('../../models/artist model/artist-model')
const Album = require('../../models/album model/album-model')

const mongoose = require('mongoose')

const createSong = async (req, res) => {
    console.log('createSong', req.body)

    switch (req.body.releaseType) {

        case "Album":
            try {

                const artist = await Artist.findOne({ artistName: req.body.artist });
                console.log(artist);

                if (!artist) {
                    throw new Error('Artist not found');
                }

                const featuredArtists = song.featuredArtists.map((id) => mongoose.Types.ObjectId(id));

                song.artist = artist._id;
                song.featuredArtists = featuredArtists;

                // const featuredArtists = await Artist.findOne({artistName: req.body.artist});

                // console.log(featuredArtists);

                // if (!featuredArtists) {

                //     console.log("featured artist not found");

                //     throw new Error("featured artist not found");
                // }

                const album = await Album.findOne({ albumName: req.body.album });

                if (req.body.album) {

                    //const album = await Album.findOne({ albumName: req.body.album });

                    console.log(album);

                    if (!album) {
                        throw new Error('Album not found');
                    }

                }


                const song = new Song({
                    ...req.body,
                    artist: artist._id,
                    album: album._id,
                    featuredArtists: featuredArtists._id
                });

                if (song.album) {

                    album.songList.push(song._id);

                    album.totalTracks++;

                    await album.save();
                }

                artist.songList.push(song._id);

                // const featuredArtists = song.featuredArtists.map((id) => mongoose.Types.ObjectId(id));

                // song.artist = artist._id;
                // song.featuredArtists = featuredArtists;

                await song.save();
                await artist.save();
                res.status(201).json(song);

                // const featuredArtists = song.featuredArtists.map((id) => mongoose.Types.ObjectId(id));

                // song.artist = artist._id;
                // song.featuredArtists = featuredArtists;

                // await song.save();
                // artist.songList.push(song._id);
                // await artist.save();

                // res.status(201).json(song);
            }

            catch (err) {
                console.log(err);
                res.status(400).json({ message: err.message });
            }
            break;

        case "Single":
            try {
                const artist = await Artist.findOne({ artistName: req.body.artist });
                console.log(artist);

                if (!artist) {

                    throw new Error('Artist not found');
                }


                const song = new Song({
                    ...req.body,
                    artist: artist._id,
                });

                artist.songList.push(song._id);

                // const featuredArtists = song.featuredArtists.map((id) => mongoose.Types.ObjectId(id));

                // song.artist = artist._id;
                // song.featuredArtists = featuredArtists;

                await song.save();
                await artist.save();
                res.status(201).json(song);


                // res.status(201).json(song);
            }

            catch (err) {
                console.log(err);
                res.status(400).json({ message: err.message });
            }
            break;
        default:
            break;
    }


    // Artist.findOne({ artistName: req.body.artist }, async (err, foundArtist) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send(err);
    //     } else if (!foundArtist) {
    //         console.log(err);
    //         res.status(400).send("Artist not found");
    //     } else {

    //         Album.findOne({ albumName: req.body.album, artist: foundArtist._id }, async (err, foundAlbum) => {

    //             if (err) {
    //                 console.log(err);
    //                 res.status(500).send(err);
    //             } else if (!foundAlbum) {
    //                 console.log(err);
    //                 console.log("there is no album");
    //                 console.log("Artist ID: " + foundArtist._id);
    //                 //console.log("Album ID: " + foundAlbum._id);

    //                 const { title, genre, artist, album, highlightStart, highlightStop, songUrl, imgUrl, releaseYear, isPublished, isLoved } = req.body;

    //                 try {
    //                     const song = new Song({
    //                         title: title,
    //                         genre: genre,
    //                         artist: foundArtist._id,
    //                         album: album,
    //                         highlightStart: highlightStart,
    //                         highlightStop, highlightStop,
    //                         songUrl: songUrl,
    //                         imgUrl: imgUrl,
    //                         releaseYear: releaseYear,
    //                         isPublished: isPublished,
    //                         isLoved: isLoved
    //                     });
    //                     await song.save()
    //                     console.log(song);
    //                     res.status(201).json(song);
    //                 } catch (err) {
    //                     console.log('err', err);
    //                     res.status(500).json({error: err});
    //                 }
    //             } else {

    //                 const { title, genre, artist, album, highlightStart, highlightStop, songUrl, imgUrl, releaseYear, isPublished, isLoved } = req.body;

    //                 try {
    //                     const song = new Song({
    //                         title: title,
    //                         genre: genre,
    //                         artist: foundArtist._id,
    //                         album: foundAlbum._id,
    //                         highlightStart: highlightStart,
    //                         highlightStop, highlightStop,
    //                         songUrl: songUrl,
    //                         imgUrl: imgUrl,
    //                         releaseYear: releaseYear,
    //                         isPublished: isPublished,
    //                         isLoved: isLoved
    //                     });
    //                     await song.save();

    //                     album.songList.push(song);

    //                     await album.save();

    //                     artist.albumList.push(album);

    //                     artist.songList.push(song);

    //                     await artist.save();

    //                     console.log(song);
    //                     res.status(201).json(song);
    //                 } catch (err) {
    //                     console.log('err', err);
    //                     res.status(500).json({error: err});
    //                 }
    //             }
    //         });
    //  Album.findOne({ albumName: req.body.album, artist: foundArtist._id }, async (err, foundAlbum) => {

    //     if (err) {
    //         console.log(err);
    //         res.status(500).send(err);
    //     } else if (!foundAlbum) {
    //         console.log(err);
    //         console.log("there is no album");
    //         //res.status(400).send("Album not found");
    //     }
    // })
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such song' })
    }

    const song = await SongModel.findById(id)
        .populate('artistList', 'artistName ')

    if (!song) {

        return response.status(404).json({ error: "Song not found" });
    }

    else {

        console.log(song);

        console.log("getOneSong method working");

        response.status(200).json(song);
    }
}


//update song
const updateSong = async (request, response) => {

    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such song' })
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