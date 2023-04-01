const CuratedPlaylist = require("../../models/curatedPlaylist model/curatedPlaylist-model");
const Song = require("../../models/song model/song-model");

const mongoose = require("mongoose");
//get all curatedPlaylist
const getAllCuratedPlaylist = async (req, res) => {
    const curatedPlaylists = await CuratedPlaylist.find({}).sort({ createdAt: -1 });

    res.status(200).json(curatedPlaylists);
};

//get 1 pl
const getACuratedPlaylist = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: "No such curatedPlaylist" });
    }

    const curatedPlaylist = await Playlist.findById(id)
        .populate("curatedPlaylistCreator")
        .populate({
            path: "songList",
            populate: {
                path: "artist",
                select: "artistName",
            },
        });
    if (!curatedPlaylist) {
        return res.status(404).json({ err: "No such curatedPlaylist" });
    } else {
        console.log(curatedPlaylist);

        res.status(200).json(curatedPlaylist);
    }
};

const getYourCuratedPlaylists = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This curatedPlaylist doesn't not exist" });
    }
    const curatedPlaylists = await Playlist.find({ curatedPlaylistCreator: id }).sort({
        createdAt: -1,
    });

    res.status(200).json(curatedPlaylists);
};

//create a new curatedPlaylist
const createCuratedPlaylist = async (req, res) => {
    console.log(req.body);
    console.log(req.body.id);
    try {
        const user = await User.findOne({ _id: req.body.id });

        if (!user) {
            throw new Error("Please sign in to play this");
        }

        let songList = [];
        let song;

        if (req.body.songList) {
            for (i = 0; i < req.body.songList.length; i++) {
                song = await Song.findOne({ _id: req.body.songList[i] });
                songList = [...songList, song._id];
                console.log(songList)

                if (!song) {
                    throw new Error("Please sign in to play this SONG");
                }

            }
        }

        const curatedPlaylist = new Playlist({
            ...req.body,
            curatedPlaylistCreator: user._id,
            songList: songList,
        });

        // curatedPlaylist.songList = songList;
        user.curatedPlaylists.push(curatedPlaylist._id);

        await curatedPlaylist.save();
        await user.save();

        res.status(201).json(curatedPlaylist);
    } catch (err) {
        console.log(err);

        res.status(400).json({ message: err.message });
    }
};

//create random curated playlist
const getRandomCuratedPlaylist = async (req, res) => {

    console.log("inside random method");

    try {

        let random = Math.floor(Math.random() * 100);

        let namePicker;

        const popNames = ["Poppin' Nights", "Friday Popz", "P-O-Pcorn"];
        const rockNames = ["Rockin' Fridays", "Rockslidez", "Rockefeller"];
        const countryNames = [];
        const hipHopNames = [];

        console.log("random value: " + random);

        if (random <= 25) {
            console.log("random was <= 25");

            const popSongs = await createRandomPopPlaylist();

            const curatedPlaylist = new CuratedPlaylist({
                curatedPlaylistCreator,
                songList: popSongs,
            });

            await curatedPlaylist.save();

        }
        else if (random > 25 && random <= 50) {
            console.log("random was >25 but <=50");
        }
        else if (random > 50 && random <= 75) {
            console.log("random was >50 but <=75");
        }
        else if (random > 75) {
            console.log("random was greater than 75");
        }
        else {
            console.log("random was idk");
        }

        res.status(201).json(curatedPlaylist);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

const createRandomPopPlaylist = async (req, res) => {

    try {

        const songs = await Song.find({genre: "pop"})
            .populate("artist")
            .populate("featuredArtists")
            .populate("album")
            .sort();

        if (!songs) {
            return res.status(404).send("songs not found");
        }

        const songLimit = [];

        while (songLimit.length < 5) {

            const randomSong = songs[Math.floor(Math.random() * songs.length)];

            if (!songLimit.includes(randomSong._id)) {
                songLimit.push(randomSong);
                console.log("added randomSong: " + randomSong.title);
            }
        }
        console.log("songLimit length: " + songLimit.length)

        if (songLimit.length > 5) {
            throw new Error("Song limit cannot be greater than 50.");
        }

        return songLimit;
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

//update a new pl

const updateCuratedPlaylist = async (req, res) => {
    const { id } = req.params;

    console.log(req.body);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: "No such curatedPlaylist" });
    }

    try {
        const curatedPlaylist = await CuratedPlaylist.findById(id);


        let songList = [];
        let song;

        for (i = 0; i < req.body.songList.length; i++) {
            song = await Song.findOne({ _id: req.body.songList[i] });
            songList = [...songList, song._id];
            console.log(songList);

            if (!song) {
                throw new Error("Please sign in to play this SONG");
            }
        }

        // const songs = await Song.find({}).sort({ createdAt: -1 });

        // if (!songs) {
        //   throw new Error("Songs not found");
        // }

        // let songList = songs.map((song) => song._id);

        const curatedPlaylistUpdate = await CuratedPlaylist.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    ...req.body,
                    // curatedPlaylistCreator: user._id,
                    curatedPlaylistName: req.body.curatedPlaylistName,
                    songList: songList,
                },
            },
            { new: true }
        );

        await curatedPlaylistUpdate.save();
        //figure out how to remove songs...

        if (!curatedPlaylistUpdate) {
            return res.status(404).json({ message: "No such curatedPlaylist" });
        }

        res.status(200).json(curatedPlaylistUpdate);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

//Delete a pl
const deleteCuratedPlaylist = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: "No such curatedPlaylist" });
    }

    try {
        const curatedPlaylist = await CuratedPlaylist.findById(id);


        await CuratedPlaylist.findOneAndDelete({ _id: id });

        res.status(200).json({ msg: "curatedPlaylist deleted" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllCuratedPlaylist,
    getYourCuratedPlaylists,
    getACuratedPlaylist,
    createCuratedPlaylist,
    getRandomCuratedPlaylist,
    updateCuratedPlaylist,
    deleteCuratedPlaylist,
};
