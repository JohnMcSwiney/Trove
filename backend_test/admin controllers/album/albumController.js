const mongoose = require('mongoose')
const Song = require('../../models/song model/song-model')
const Artist = require('../../models/artist model/artist-model')
const Album = require('../../models/album model/album-model')


const getAllAlbum = async (req, res) => {
    const albums = await Album.find({}).sort({ createdAt: -1 });
    res.status(200).json(albums);
}


const getAlbum = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ err: 'No such Album' })
    }

    const album = await Album.findById(id);

    if (!album) {
        return res.status(400).json({ err: 'No such Album' })
    }

    res.status(200).json(album);
}

const createAlbum = async (req, res) => {

    try {

        const artist = await Artist.findOne({ artistName: req.body.artist });

        console.log(artist);

        if (!artist) {

            console.log("artist not found");

            throw new Error("Artist not found");
        }

        const featuredArtists = await Promise.all(req.body.featuredArtists.map(async (name) => {

            const featuredArtist = await Artist.findOne({ artistName: name });

            if (!featuredArtist) {
              throw new Error(`Featured artist "${name}" not found`);
            }

            return featuredArtist._id;
          }));

          console.log(featuredArtists);

        const album = new Album({
            ...req.body,
            artist: artist._id,
            featuredArtists: featuredArtists
        });


        album.songList = [];
        artist.albumList.push(album._id);

        for (const featuredArtistId of featuredArtists) {
            const featuredArtist = await Artist.findById(featuredArtistId);
            featuredArtist.albumList.push(album._id);
            await featuredArtist.save();
        }

        await album.save();
        await artist.save();

        res.status(201).json(album);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }


    // Artist.findOne({ artistName: req.body.artist }, async (err, foundArtist) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send(err);
    //     } else if (!foundArtist) {
    //         console.log(err);
    //         res.status(400).send("Artist not found");
    //     } else {
    //         Song.findOne({ title: req.body.song, artist: foundArtist._id }, async (err, foundSong) => {

    //             if (err) {
    //                 console.log(err);
    //                 res.status(500).send(err);
    //             } else if (!foundSong) {
    //                 console.log(err);
    //                 console.log("there are no songs");
    //                 const { albumName, albumArt, artist, featuredArtists, totalTracks, isPublished, publishDate, releaseType, releaseYear, songList } = req.body;

    //                 const album = new Album({
    //                     albumName: albumName,
    //                     albumArt: albumArt,
    //                     artist: foundArtist._id,
    //                     totalTracks: totalTracks,
    //                     isPublished,
    //                     publishDate: publishDate,
    //                     releaseType: releaseType,
    //                     releaseYear: releaseYear,
    //                     songList: []
    //                 });
    //                 try {
    //                     await album.save();

    //                     artist.albumList.push(album);

    //                     await artist.save();

    //                     res.status(201).json(album);
    //                 } catch (err) {
    //                     res.status(500).json({ message: err.message });
    //                 }
    //                 //res.status(400).send("Songs not found");
    //             } else {

    //                 const { albumName, albumArt, artist, featuredArtists, totalTracks, isPublished, publishDate, releaseType, releaseYear, songList } = req.body;

    //                 const album = new Album({
    //                     albumName: albumName,
    //                     albumArt: albumArt,
    //                     artist: foundArtist._id,
    //                     totalTracks: totalTracks,
    //                     isPublished,
    //                     publishDate: publishDate,
    //                     releaseType: releaseType,
    //                     releaseYear: releaseYear,
    //                     songList: foundSong._id
    //                 });
    //                 try {
    //                     await album.save();
    //                     res.status(201).json(album);
    //                 } catch (err) {
    //                     res.status(500).json({ message: err.message });
    //                 }
    //             }
    //         });
    //     }
    // });

}

const updateAlbum = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such album' })
    }

    const album = await Album.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!album) {
        return res.status(404).json({ message: 'No such album' });
    }

    res.status(200).json(album)

}

const deleteAlbum = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such album' })
    }

    const album = await Album.findOneAndDelete({ _id: id });
    if (!album) {
        return res.status(404).json({ message: 'No such album' });
    }

    res.status(200).json(album)
}

module.exports = {
    getAlbum,
    getAllAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum
}