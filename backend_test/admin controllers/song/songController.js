const Song = require('../../models/song model/song-model')
const Artist = require('../../models/artist model/artist-model')
const Album = require('../../models/album model/album-model')

const mongoose = require('mongoose')

const createSong = async (req, res) => {
    console.log('createSong', req.body)

    switch (req.body.releaseType) {

        case "Album" || "EP":
            try {

                const artist = await Artist.findOne({ artistName: req.body.artist });
                console.log(artist);

                if (!artist) {
                    throw new Error('Artist not found');
                }

                const featuredArtists = await Promise.all(req.body.featuredArtists.map(async (name) => {

                    const featuredArtist = await Artist.findOne({ artistName: name });

                    if (!featuredArtist) {
                        throw new Error(`Featured artist "${name}" not found`);
                    }

                    return featuredArtist._id;
                }));

                console.log(featuredArtists);


                const album = await Album.findOne({ albumName: req.body.album });

                if (req.body.album) {

                    console.log(album);

                    if (!album) {
                        throw new Error('Album not found');
                    }

                }

                const song = new Song({
                    ...req.body,
                    artist: artist._id,
                    album: album._id,
                    releaseType: "Album",
                    featuredArtists: featuredArtists
                });

                if (song.album) {

                    album.songList.push(song._id);

                    album.totalTracks++;

                    song.releaseYear = album.releaseYear;

                    await album.save();
                }

                artist.songList.push(song._id);

                for (const featuredArtistId of featuredArtists) {
                    const featuredArtist = await Artist.findById(featuredArtistId);
                    featuredArtist.albumList.push(song._id);
                    await featuredArtist.save();
                }

                await song.save();
                await artist.save();
                res.status(201).json(song);
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

                if (req.body.featuredArtist == null) {

                    console.log(req.body.featuredArtist);

                    //check why is it null (did user decide to do solo or other artists cannot be found?);

                    const song = new Song({
                        ...req.body,
                        artist: artist._id
                    });
    
                    artist.songList.push(song._id);

                    await song.save();
                    await artist.save();
                    res.status(201).json(song);
                }

                else {

                    const featuredArtists = await Promise.all(req.body.featuredArtists.map(async (name) => {

                        const featuredArtist = await Artist.findOne({ artistName: name });
    
                        if (!featuredArtist) {
                            throw new Error(`Featured artist "${name}" not found`);
                        }
    
                        return featuredArtist._id;
                    }));
    
                    console.log(featuredArtists);
    
                    const song = new Song({
                        ...req.body,
                        artist: artist._id,
                        featuredArtists: featuredArtists,
                    });
    
                    artist.songList.push(song._id);
    
    
                    for (const featuredArtistId of featuredArtists) {
                        const featuredArtist = await Artist.findById(featuredArtistId);
                        featuredArtist.songList.push(song._id);
                        await featuredArtist.save();
                    }
    
                    await song.save();
                    await artist.save();
                    res.status(201).json(song);
                }

            }

            catch (err) {
                console.log(err);
                res.status(400).json({ message: err.message });
            }
            break;
        default:
            break;
    }
}

//get all songs
const getAllSongs = async (req, res) => {

    try {
        const songs = await Song.find({})

            .populate('featuredArtists', 'artist')

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

    const song = await Song.findById(id)
        .populate('featuredArtists', 'artistName')

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
const updateSong = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such song' })
    }

    const song = await Song.findOneAndUpdate({ _id: id }, {

        ...req.body
    });

    if (!song) {

        return res.status(404).json({ error: "Song not found" });
    }
    else {

        console.log(song);

        console.log("updateSong method working");

        res.status(200).json(song);
    }
}





const deleteSong = async (request, response) => {

    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {

        return response.status(404).json({ error: "song not found" });
    }

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
    createSong,
    deleteSong,
    updateSong
}