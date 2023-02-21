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

        if (!req.body.featuredArtists) {

            const album = new Album({
                ...req.body,
                artist: artist._id
            });


            album.songList = [];
            artist.albumList.push(album._id);

            await album.save();
            await artist.save();

            res.status(201).json(album);
        }

        else {

            const featuredArtists = await Promise.all(req.body.featuredArtists.map(async (name) => {

                const featuredArtist = await Artist.findOne({ artistName: name });

                if (!featuredArtist) {
                    throw new Error('featured artist(s) not found');
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
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

//WIP
const updateAlbum = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such album' })
    }


    try {

        const artist = await Artist.findOne({ artistName: req.body.artist });

        console.log("da artist: " + artist);

        if (!artist) {

            console.log("artist not found");

            throw new Error("Artist not found");
        }

        const songs = await Song.find({}).sort({ createdAt: -1 });

        if (!songs) {

            console.log("songs not found");

            throw new Error("Songs not found");
        }

        if (!req.body.featuredArtists) {

            const album = await Album.findOneAndUpdate(
                { _id: id },
                { $set: { ...req.body, artist: artist._id, songList: songs._id } },
                { new: true }
            );

            if (!album) {
                return res.status(404).json({ message: 'No such album' });
            }

            res.status(200).json(album);
        }

        else {

            const featuredArtists = await Promise.all(req.body.featuredArtists.map(async (name) => {

                const featuredArtist = await Artist.findOne({ artistName: name });

                if (!featuredArtist) {
                    throw new Error('featured artist(s) not found');
                }

                return featuredArtist._id;
            }));

            console.log(featuredArtists);

            const album = await Album.findOneAndUpdate(
                { _id: id },
                { $set: { ...req.body, artist: artist._id, songList: songs._id, featuredArtists: featuredArtists } },
                { new: true }
            );

            for (const featuredArtistId of featuredArtists) {
                const featuredArtist = await Artist.findById(featuredArtistId);
                featuredArtist.albumList.push(album._id);
                await featuredArtist.save();
            }

            if (!album) {
                return res.status(404).json({ message: 'No such album' });
            }

            res.status(200).json(album);
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }

}


//WIP
const deleteAlbum = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such album' })
    }

    try {

        const album = await Album.findById(id);

        const artist = await Artist.findOne({ _id: album.artist._id });

        if (!artist) {

            console.log("artist not found");

            throw new Error("Artist not found");
        }

        const songs = await Song.find({}).sort({ createdAt: -1 });

        if (!req.body.featuredArtists) {

            await Album.findOneAndDelete({ _id: id });

            await Artist.updateOne({ _id: artist._id }, { $pull: { albumList: album._id } });

            await Song.deleteMany({ _id: songs }, { $pull: { songList: artist.songList } })

            if (!album) {

                return res.status(404).json({ message: 'No such album' });
            }

            res.status(200).json(album);
        }

        else {
            
            const featuredArtists = await Promise.all(songs.featuredArtists.map(async (name) => {

                const featuredArtist = await Artist.findOne({ artistName: name });

                if (!featuredArtist) {
                    throw new Error(" featured artist not found");
                }

                return featuredArtist._id;
            }));

            await Album.findOneAndDelete({ _id: id });

            await Artist.updateOne({ _id: artist._id }, { $pull: { albumList: album._id } });

            await Song.deleteMany({ _id: album.songs }, { $pull: { songList: artist.songList } });

            for (const featuredArtist of featuredArtists) {
                await Artist.updateMany({ _id: { $in: featuredArtists._id } }, { $pull: { albumList: album._id } });
            }

            if (!album) {
                return res.status(404).json({ message: 'No such album' });
            }

            res.status(200).json(album);
        }

    } catch (err) {

        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getAlbum,
    getAllAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum
}