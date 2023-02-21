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

                const album = await Album.findOne({ albumName: req.body.album });

                if (!album) {
                    throw new Error('Album not found');
                }

                if (req.body.featuredArtists == null || !req.body.featuredArtists) {

                    const song = new Song({
                        ...req.body,
                        artist: artist._id,
                        album: album._id,
                        releaseType: "Album"
                    });

                    if (song.album) {

                        album.songList.push(song._id);

                        album.totalTracks++;

                        song.releaseYear = album.releaseYear;

                        await album.save();
                    }

                    artist.songList.push(song._id);

                    await song.save();
                    await artist.save();
                    res.status(201).json(song);

                }

                else {

                    const featuredArtists = await Promise.all(req.body.featuredArtists.map(async (name) => {

                        const featuredArtist = await Artist.findOne({ artistName: name });

                        if (!featuredArtist) {
                            throw new Error('Featured artist not found');
                        }

                        return featuredArtist._id;
                    }));

                    console.log(featuredArtists);

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
                        featuredArtist.songList.push(song._id);

                        // if (!featuredArtist.album._id || featuredArtist.album._id == null) {

                        //     featuredArtist.albumList.push(album._id);
                        // }

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

        case "Single":

            try {
                const artist = await Artist.findOne({ artistName: req.body.artist });
                console.log(artist);

                if (!artist) {

                    throw new Error('Artist not found');
                }

                if (req.body.featuredArtist == null || !req.body.featuredArtists) {

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


//WIP
const updateSong = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such song' })
    }

    switch (req.body.releaseType) {

        case "Album" || "EP":

            try {

                const artist = await Artist.findOne({ artistName: req.body.artist });

                if (!artist) {
                    throw new Error("artist not found");
                }

                const album = await Album.findOne({ albumName: req.body.album });
                if (!album) {
                    throw new Error("album not found");
                }

                if (!req.body.featuredArtists || req.body.featuredArtists == null) {

                    const song = await Song.findOneAndUpdate(
                        { _id: id },
                        { $set: { ...req.body, artist: artist._id, album: album._id } },
                        { new: true }
                    );

                    if (!song) {

                        return res.status(404).json({ error: "Song not found" });
                    }

                    console.log(song);

                    console.log("updateSong method working");

                    res.status(200).json(song);

                }

                else {

                    const featuredArtists = await Promise.all(req.body.featuredArtists.map(async (name) => {

                        const featuredArtist = await Artist.findOne({ artistName: name });

                        if (!featuredArtist) {
                            throw new Error("featured artist(s) not found");
                        }

                        return featuredArtist._id;
                    }));

                    const song = await Song.findOneAndUpdate(
                        { _id: id },
                        { $set: { ...req.body, artist: artist._id, album: album._id, featuredArtists: featuredArtists } },
                        { new: true }
                    );

                    for (const featuredArtistId of featuredArtists) {
                        const featuredArtist = await Artist.findById(featuredArtistId);
                        featuredArtist.songList.push(song._id);
                        await featuredArtist.save();
                    }

                    if (!song) {

                        return res.status(404).json({ error: "Song not found" });
                    }

                    console.log(song);

                    console.log("updateSong method working");

                    res.status(200).json(song);
                }
            }
            catch (err) {

                console.log(err);
                res.status(400).json({ message: err.message });
            }
            break;

        case "Single":

            const artist = await Artist.findOne({ artistName: req.body.artist });
            if (!artist) {
                throw new Error("artist not found");
            }

            if (!req.body.featuredArtists) {

                try {

                    const song = await Song.findOneAndUpdate(
                        { _id: id },
                        { $set: { ...req.body, artist: artist._id } },
                        { new: true }
                    );

                    if (!song) {

                        return res.status(404).json({ error: "Song not found" });
                    }

                    console.log(song);

                    console.log("updateSong method working");

                    res.status(200).json(song);
                }
                catch (err) {

                    console.log(err);
                    res.status(400).json({ message: err.message });
                }

            }

            else {

                const featuredArtists = await Promise.all(req.body.featuredArtists.map(async (name) => {

                    const featuredArtist = await Artist.findOne({ artistName: name });

                    //console.log("dfsfs" + featuredArtists);

                    if (!featuredArtist) {
                        throw new Error("featured artist(s) not found");
                    }

                    return featuredArtist._id;
                }));


                try {

                    const song = await Song.findOneAndUpdate(
                        { _id: id },
                        { $set: { ...req.body, artist: artist._id, featuredArtists: featuredArtists } },
                        { new: true }
                    );

                    if (!song) {

                        return res.status(404).json({ error: "Song not found" });
                    }

                    if (!song.featuredArtists) {

                        for (const featuredArtistId of featuredArtists) {
                            const featuredArtist = await Artist.findById(featuredArtistId);
                            featuredArtist.songList.pop(song._id);
                            await featuredArtist.save();
                        }
                    }

                    else {
                        for (const featuredArtistId of featuredArtists) {
                            const featuredArtist = await Artist.findById(featuredArtistId);
                            featuredArtist.songList.push(song._id);
                            await featuredArtist.save();
                        }
                    }

                    console.log(song);

                    console.log("sfdsgakjdsadsa" + song.featuredArtists);

                    console.log("updateSong method working");

                    res.status(200).json(song);
                }
                catch (err) {

                    console.log(err);
                    res.status(400).json({ message: err.message });
                }
            }

        default:
            //throw new Error("Release Type undefined");
            break;
    }
}

//WIP
const deleteSong = async (req, res) => {

    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({ error: "song not found" });
    }

    try {

        console.log(req.params);

        //console.log("Artist: " + req.body.artist);

        const song = await Song.findById(id);

        console.log(song);

        const artist = await Artist.findOne({ _id: song.artist._id });

        if (!artist) {
            throw new Error("Artist not found");
        }

        const album = await Album.findOne({ _id: song.album._id });

        if (!album) {
            throw new Error("Album not found");
        }

        if (req.body.featuredArtist == null || !req.body.featuredArtists) {

            await Artist.updateOne({ _id: artist._id }, { $pull: { songList: song._id } });

            await Album.updateOne({ _id: album._id }, { $pull: { songList: song._id } });


            await Song.findOneAndDelete({ _id: id })

            console.log("song is deleted");

            res.status(200).json({ msg: "song deleted!" });
        }

        else {

            const featuredArtists = await Promise.all(song.featuredArtists.map(async (name) => {

                const featuredArtist = await Artist.findOne({ artistName: name });

                if (!featuredArtist) {
                    throw new Error(" featured artist not found");
                }

                return featuredArtist._id;
            }));


            await Artist.updateOne({ _id: artist._id }, { $pull: { songList: song._id } });

            for (const featuredArtist of featuredArtists) {

                await Artist.updateMany({ _id: { $in: featuredArtists._id } }, { $pull: { songList: song._id } });
                //artist.songList.pop(song._id);

            }

            await Album.updateOne({ _id: album._id }, { $pull: { songList: song._id } }, {totalTracks: (album.totalTracks--)});

            // for (const featuredArtistId of featuredArtists) {
            //     const featuredArtist = await Artist.findById(featuredArtistId);
            //     featuredArtist.songList.pop(song._id);
            //     await featuredArtist.save();
            // }

            await Song.findOneAndDelete({ _id: id });

            console.log("song is deleted");

            res.status(200).json({ msg: "odfsfsjnj song deleted!" });
        }
    }
    catch (err) {

        console.log(err);
        res.status(400).json({ message: err.message });
    }

}

module.exports = {
    getAllSongs,
    getSong,
    createSong,
    deleteSong,
    updateSong
}