const CuratedPlaylist = require("../../models/curatedPlaylist model/curatedPlaylist-model");
const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const cron = require("node-cron");


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
            isGenerated: false
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

const generateCuratedPlaylists = async (req, res) => {

    try {

        await createTopSongsPlaylist();

        await createTopArtistPlaylist();

        await createRandomPopPlaylist();

        await createRandomRockPlaylist();

        await createRandomCountryPlaylist();

        await createRandomHipHopPlaylist();

        await createRandomPlaylist();

        return res.status(201).json({msg: "required curated playlists created!"});

        // const popNames = ["Poppin' Nights", "Friday Popz", "P-O-Pcorn"];
        // const rockNames = ["Rockin' Fridays", "Rockslidez", "Rockefeller"];
        // const countryNames = ["Country Vibes", "Western Dayz", "Big Iron"];
        // const hipHopNames = ["Trappin' Thursdays", "Westside Vibez", "Daily Beatz"];
        // const topSongNames = ["Top Beatz", "Popular Tracks", "Most Searched"];
        // const topArtistNames = "M.V.P";
        // const randomNames = ["Random Vibez", "The Shuffler", "Mystery Music"]

        // const topSongsPlaylist = await CuratedPlaylist.findOne({ curatedPlaylistName: { $in: topSongNames } });
        // // const topArtistPlaylist = await CuratedPlaylist.findOne({curatedPlaylistName: {$in: topArtistNames}});
        // const topArtistPlaylist = await CuratedPlaylist.findOne({ curatedPlaylistName: topArtistNames });
        // const popPlaylist = await CuratedPlaylist.findOne({ curatedPlaylistName: { $in: popNames } })
        // const rockPlaylist = await CuratedPlaylist.findOne({ curatedPlaylistName: { $in: rockNames } })
        // const countryPlaylist = await CuratedPlaylist.findOne({ curatedPlaylistName: { $in: countryNames } })
        // const hipHopPlaylist = await CuratedPlaylist.findOne({ curatedPlaylistName: { $in: hipHopNames } })
        // const randomPlaylist = await CuratedPlaylist.findOne({curatedPlaylistName: { $in: randomNames } });

        // if (!topSongsPlaylist) {
        //     const topSongs = await createTopSongsPlaylist();
        //     return res.status(201).json(topSongs);
        // }
        // if (!topArtistPlaylist) {
        //     const topArtistSongs = await createTopArtistPlaylist();
        //     return res.status(201).json(topArtistSongs);
        // }
        // if (!popPlaylist) {
        //     const popSongs = await createRandomPopPlaylist();
        //     return res.status(201).json(popSongs);
        // }
        // if (!rockPlaylist) {
        //     const rockSongs = await createRandomRockPlaylist();
        //     return res.status(201).json(rockSongs);
        // }
        // if (!countryPlaylist) {
        //     const countrySongs = await createRandomCountryPlaylist();
        //     return res.status(201).json(countrySongs);
        // }
        // if (!hipHopPlaylist) {
        //     const hipHopSongs = await createRandomHipHopPlaylist();
        //     return res.status(201).json(hipHopSongs);
        // }
        // if (!randomPlaylist) {
        //     const randomSongs = await createRandomPlaylist();
        //     return res.status(201).json(randomSongs);
        // }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

//create random curated playlist
// const getRandomCuratedPlaylist = async (req, res) => {

//     console.log("inside random method");

//     try {


//         let random = Math.floor(Math.random() * 100);
//         // let random = 45;

//         console.log("random value: " + random);

//         if (random <= 25) {
//             console.log("random was <= 25");

//             const popSongs = await createRandomPopPlaylist();

//             let name = "";
//             let index = 0;

//             index = Math.floor(Math.random() * popNames.length);
//             name = popNames[index];

//             console.log("name: " + name);

//             const curatedPlaylist = new CuratedPlaylist({
//                 curatedPlaylistName: name,
//                 songList: popSongs,
//             });

//             await curatedPlaylist.save();

//             res.status(201).json(curatedPlaylist);
//         }
//         else if (random > 25 && random <= 50) {
//             console.log("random was >25 but <=50");

//             const rockSongs = await createRandomRockPlaylist();

//             let name = "";
//             let index = 0;

//             index = Math.floor(Math.random() * rockNames.length);
//             name = rockNames[index];

//             console.log("name: " + name);

//             const curatedPlaylist = new CuratedPlaylist({
//                 curatedPlaylistName: name,
//                 songList: rockSongs,
//             });

//             await curatedPlaylist.save();

//             res.status(201).json(curatedPlaylist);
//         }
//         else if (random > 50 && random <= 75) {
//             console.log("random was >50 but <=75");
//             //no country songs atm so it will crash

//             console.log("no country songs atm");
//             // const countrySongs = await createRandomCountryPlaylist();

//             // let name = "";
//             // let index = 0;

//             // index = Math.floor(Math.random() * countryNames.length);
//             // name = countryNames[index];

//             // console.log("name: " + name);

//             // const curatedPlaylist = new CuratedPlaylist({
//             //     curatedPlaylistName: name,
//             //     songList: countrySongs,
//             // });

//             // await curatedPlaylist.save();

//             // res.status(201).json(curatedPlaylist);
//             res.status(201).json({ msg: "no country songs atm" });
//         }
//         else if (random > 75) {
//             console.log("random was greater than 75");

//             const hipHopSongs = await createRandomHipHopPlaylist();

//             let name = "";
//             let index = 0;

//             index = Math.floor(Math.random() * hipHopNames.length);
//             name = hipHopNames[index];

//             console.log("name: " + name);

//             const curatedPlaylist = new CuratedPlaylist({
//                 curatedPlaylistName: name,
//                 songList: hipHopSongs,
//             });

//             await curatedPlaylist.save();

//             res.status(201).json(curatedPlaylist);
//         }
//         else {
//             console.log("random was idk");

//             const randomSongs = await createRandomPlaylist()

//             let name = "";
//             let index = 0;

//             index = Math.floor(Math.random() * randomNames.length);
//             name = randomNames[index];

//             console.log("name: " + name);

//             const curatedPlaylist = new CuratedPlaylist({
//                 curatedPlaylistName: name,
//                 songList: randomSongs,
//             });

//             await curatedPlaylist.save();

//             res.status(201).json(curatedPlaylist);
//         }


//     } catch (err) {
//         console.log(err);
//         res.status(400).json({ message: err.message });
//     }
// };

const createRandomPlaylist = async (req, res) => {

    try {
        const songs = await Song.find()
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
        console.log("songLimit length: " + songLimit.length);

        if (songLimit.length > 5) {
            throw new Error("Song limit cannot be greater than 50.");
        }

        const randomNames = ["Random Vibez", "The Shuffler", "Mystery Music"];

        let name = "";
        let index = 0;

        index = Math.floor(Math.random() * randomNames.length);
        name = randomNames[index];

        console.log("name: " + name);

        const curatedPlaylist = new CuratedPlaylist({
            curatedPlaylistName: name,
            songList: songLimit,
            isGenerated: true
        });

        console.log("curatedPlaylist: " + curatedPlaylist);

        await curatedPlaylist.save();
        return curatedPlaylist;
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const createRandomPopPlaylist = async (req, res) => {

    try {

        const songs = await Song.find({ genre: "pop" })
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
        console.log("songLimit length: " + songLimit.length);

        if (songLimit.length > 5) {
            throw new Error("Song limit cannot be greater than 50.");
        }

        const popNames = ["Poppin' Nights", "Friday Popz", "P-O-Pcorn"];

        let name = "";
        let index = 0;

        index = Math.floor(Math.random() * popNames.length);
        name = popNames[index];

        console.log("name: " + name);

        const curatedPlaylist = new CuratedPlaylist({
            curatedPlaylistName: name,
            songList: songLimit,
            isGenerated: true
        });

        console.log("curatedPlaylist: " + curatedPlaylist);

        await curatedPlaylist.save();
        return curatedPlaylist;
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const createRandomRockPlaylist = async (req, res) => {

    try {

        const songs = await Song.find({ genre: "rock" })
            .populate("artist")
            .populate("featuredArtists")
            .populate("album")
            .sort();

        if (!songs) {
            return res.status(404).send("songs not found");
        }

        const songLimit = [];

        while (songLimit.length < 3) {

            const randomSong = songs[Math.floor(Math.random() * songs.length)];

            if (!songLimit.includes(randomSong._id)) {
                songLimit.push(randomSong);
                console.log("added randomSong: " + randomSong.title);
            }
        }
        console.log("songLimit length: " + songLimit.length);

        if (songLimit.length > 3) {
            throw new Error("Song limit cannot be greater than 50.");
        }

        const rockNames = ["Rockin' Fridays", "Rockslidez", "Rockefeller"];

        let name = "";
        let index = 0;

        index = Math.floor(Math.random() * rockNames.length);
        name = rockNames[index];

        console.log("name: " + name);

        const curatedPlaylist = new CuratedPlaylist({
            curatedPlaylistName: name,
            songList: songLimit,
            isGenerated: true
        });

        console.log("curatedPlaylist: " + curatedPlaylist);

        await curatedPlaylist.save();
        return curatedPlaylist;
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const createRandomCountryPlaylist = async (req, res) => {

    try {

        const songs = await Song.find({ genre: "country" })
            .populate("artist")
            .populate("featuredArtists")
            .populate("album")
            .sort();

        if (!songs) {
            return res.status(404).send("songs not found");
        }

        const songLimit = [];

        while (songLimit.length < 3) {

            const randomSong = songs[Math.floor(Math.random() * songs.length)];

            if (!songLimit.includes(randomSong._id)) {
                songLimit.push(randomSong);
                console.log("added randomSong: " + randomSong.title);
            }
        }
        console.log("songLimit length: " + songLimit.length);

        if (songLimit.length > 3) {
            throw new Error("Song limit cannot be greater than 50.");
        }

        const countryNames = ["Country Vibes", "Western Dayz", "Big Iron"];

        let name = "";
        let index = 0;

        index = Math.floor(Math.random() * countryNames.length);
        name = countryNames[index];

        console.log("name: " + name);

        const curatedPlaylist = new CuratedPlaylist({
            curatedPlaylistName: name,
            songList: songLimit,
            isGenerated: true
        });

        console.log("curatedPlaylist: " + curatedPlaylist);

        await curatedPlaylist.save();
        return curatedPlaylist;
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const createRandomHipHopPlaylist = async (req, res) => {

    try {

        const songs = await Song.find({ genre: "hiphop" })
            .populate("artist")
            .populate("featuredArtists")
            .populate("album")
            .sort();

        if (!songs) {
            return res.status(404).send("songs not found");
        }

        const songLimit = [];

        while (songLimit.length < 3) {

            const randomSong = songs[Math.floor(Math.random() * songs.length)];

            if (!songLimit.includes(randomSong._id)) {
                songLimit.push(randomSong);
                console.log("added randomSong: " + randomSong.title);
            }
        }
        console.log("songLimit length: " + songLimit.length);

        if (songLimit.length > 3) {
            throw new Error("Song limit cannot be greater than 50.");
        }

        const hipHopNames = ["Trappin' Thursdays", "Westside Vibez", "Daily Beatz"];

        let name = "";
        let index = 0;

        index = Math.floor(Math.random() * hipHopNames.length);
        name = hipHopNames[index];

        console.log("name: " + name);

        const curatedPlaylist = new CuratedPlaylist({
            curatedPlaylistName: name,
            songList: songLimit,
            isGenerated: true
        });

        console.log("curatedPlaylist: " + curatedPlaylist);

        await curatedPlaylist.save();
        return curatedPlaylist;
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const createTopSongsPlaylist = async (req, res) => {

    try {

        const songs = await Song.find()
            .populate("artist")
            .populate("featuredArtists")
            .populate("album")
            .sort({ searchCount: -1 });

        if (!songs) {
            return res.status(404).send("songs not found");
        }

        const songLimit = [];

        while (songLimit.length < 3) {

            const currentSong = songs.shift();

            if (!songLimit.includes(currentSong._id)) {
                songLimit.push(currentSong);
                console.log("added currentSong: " + currentSong.title);
                console.log("searchCount of currentSong: " + currentSong.searchCount);
            }
        }
        console.log("songLimit length: " + songLimit.length);

        if (songLimit.length > 3) {
            throw new Error("Song limit cannot be greater than 50.");
        }

        const topSongNames = ["Top Beatz", "Popular Tracks", "Most Searched"];

        let name = "";
        let index = 0;

        index = Math.floor(Math.random() * topSongNames.length);
        name = topSongNames[index];

        console.log("name: " + name);

        const curatedPlaylist = new CuratedPlaylist({
            curatedPlaylistName: name,
            songList: songLimit,
            isGenerated: true
        });

        console.log("curatedPlaylist: " + curatedPlaylist);

        await curatedPlaylist.save();
        return curatedPlaylist;

    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const createTopArtistPlaylist = async (req, res) => {

    try {

        const songLimit = [];

        const artists = await Artist.find()
            .limit(5)
            .sort({ searchCount: -1 });

        if (!artists) {
            return res.status(404).send("artists not found");
        }

        for (const artist of artists) {

            console.log("current artist: " + artist.artistName + ", search count: " + artist.searchCount);

            const song = await Song.findOne({ artist: artist._id })
                .sort({ searchCount: -1 });

            console.log("current song: " + song.title + ", search count: " + song.searchCount);

            if (!songLimit.includes(song._id)) {
                songLimit.push(song);
                console.log("added song: " + song.title);
            }

            if (songLimit.length > 5) {
                throw new Error("Song limit cannot be greater than 5.");
            }
        }

        // let name = "";
        // let index = 0;

        // index = Math.floor(Math.random() * topSongNames.length);
        // name = topSongNames[index];

        // console.log("name: " + name);

        const topArtistNames = "M.V.P";

        const curatedPlaylist = new CuratedPlaylist({
            curatedPlaylistName: topArtistNames,
            songList: songLimit,
            isGenerated: true
        });

        console.log("curatedPlaylist: " + curatedPlaylist);

        await curatedPlaylist.save();
        return curatedPlaylist;
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

cron.schedule("0 0 * * 0", async () => {
    await CuratedPlaylist.deleteMany({$where: {isGenerated: true}}, (err) => {
        if (err) {
            console.log(err);
        }
        generateCuratedPlaylists();
    })
});

module.exports = {
    getAllCuratedPlaylist,
    getYourCuratedPlaylists,
    getACuratedPlaylist,
    createCuratedPlaylist,
    //getRandomCuratedPlaylist,
    generateCuratedPlaylists,
    updateCuratedPlaylist,
    deleteCuratedPlaylist,
};
