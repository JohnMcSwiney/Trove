const mongoose = require("mongoose");
const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const EP = require("../../models/ep model/ep-model");

const getAllEP = async (req, res) => {
  const eps = await EP.find({}).sort({ createdAt: -1 });
  res.status(200).json(eps);
};

const getEP = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such EP" });
    }

    const ep = await EP.findById(id);

    if (!ep) {
      return res.status(404).json({ error: "No such EP" });
    }

    res.status(200).json(ep);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createEP = async (req, res) => {
  const artistID = req.body.artistID;

  const success = "Created EP successfully";
  try {
    const artist = await Artist.findById(artistID);

    //console.log(artist);

    if (!artist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    const ep = new EP({
      ...req.body,
      artist: artist._id,
    });

    ep.songList = [];
    artist.epList.push(ep._id);

    await ep.save();
    await artist.save();

    res.status(201).json(ep);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// console.log("Request Body FT: " + req.body.featuredArtists);

// console.log("outside of if stmt");

// if (!req.body.featuredArtists || req.body.featuredArtists == null) {
//   console.log("should be in here");

//   console.log("inside ep method");

//   const ep = new EP({
//     ...req.body,
//     artist: artist._id,
//   });

//   ep.songList = [];
//   artist.epList.push(ep._id);

//   await ep.save();
//   await artist.save();

//   res.status(201).json(ep);
// } else {
//   const featuredArtists = await Promise.all(
//     req.body.featuredArtists.map(async (name) => {
//       const featuredArtist = await Artist.findOne({ artistName: name });

//       if (!featuredArtist) {
//         throw new Error("featured artist(s) not found");
//       }

//       return featuredArtist._id;
//     })
//   );

//   console.log("bruhhhhh : " + featuredArtists);

//   const ep = new EP({
//     ...req.body,
//     artist: artist._id,
//     featuredArtists: featuredArtists,
//   });

//   ep.songList = [];
//   artist.epList.push(ep._id);

//   for (const featuredArtistId of featuredArtists) {
//     const featuredArtist = await Artist.findById(featuredArtistId);
//     featuredArtist.epList.push(ep._id);
//     await featuredArtist.save();
//   }

//   await ep.save();
//   await artist.save();

//   res.status(201).json({ep, success});
// }

//WIP
const updateEP = async (req, res) => {
  const { id } = req.params;
  const { epArt, epName, artist, releaseYear, songList, genre } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ep" });
  }

  try {
    const ep = await EP.findById(id);

    if (!ep) {
      res.status(404).json({ error: "ep is not available" });
    }

    const epArtist = await Artist.findById(artist);

    if (!epArtist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    ep.epArt = epArt;
    ep.epName = epName;
    ep.releaseYear = releaseYear;
    ep.epGenre = genre;
    ep.artist = epArtist;

    const songListIDs = songList && songList.map((item) => item._id || []);
    if (songListIDs.length > 5) {
      res.status(500).json({ error: "EP can contain max to 5 songs" });
    }

    //adding song to songList
    for (const songs of songList) {
      const foundSong = await Song.findById(songs);

      if (!foundSong) {
        return res.status(404).json({ error: "This song  doesn't exist" });
      }

      if (
        foundSong.ep === null ||
        (foundSong.ep._id.toString() !== id &&
          !ep.songList.includes(foundSong._id))
      ) {
        ep.songList.push(foundSong._id);
        foundSong.ep = ep;
        foundSong.releaseType = ["ep"];
        await foundSong.save();
      }
    }

    //remove

    if (songList.length === 0) {
      const epSongs = await Song.find({ ep: id });

      for (const song of epSongs) {
        song.ep = null;
        song.releaseType = ["single"];
        ep.songList = [];
        await song.save();
      }
    } else {
      for (const songs of ep.songList) {
        if (!songListIDs.includes(songs.toString())) {
          ep.songList.pull(songs);
          const foundSong = await Song.findById(songs);

          foundSong.ep = null;
          foundSong.releaseType = ["single"];
          await foundSong.save();
        }
      }
    }
    ep.songList = songList;
    const success = "Updated ep successfully";
    await ep.save();
    res.status(200).json({ ep, success });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//WIP
const deleteEP = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such ep" });
  }

  try {
    const ep = await EP.findById(id);

    if (!ep) {
      throw new Error("ep not found");
    }

    const artist = await Artist.findOne({ _id: ep.artist._id });

    if (!artist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    // const songs = await Promise.all(ep.songList.map(async () => {

    //     const song = await Song.findOne({ _id: ep.songs });

    //     if (!song) {
    //         throw new Error(" songs not found");
    //     }

    //     return song._id;
    // }));

    const featuredArtists = await Promise.all(
      ep.featuredArtists.map(async () => {
        const featuredArtist = await Artist.findOne({
          _id: ep.featuredArtists,
        });

        if (!featuredArtist) {
          throw new Error(" featured artist not found");
        }

        return featuredArtist._id;
      })
    );

    await EP.findOneAndDelete({ _id: id });

    await Artist.updateOne(
      { _id: artist._id },
      { $pull: { epList: ep._id, songList: { $in: ep.songList } } }
    );

    await Song.deleteMany({ _id: ep.songList });

    for (const featuredArtistId of featuredArtists) {
      await Artist.updateOne(
        { _id: featuredArtistId },
        { $pull: { epList: ep._id, songList: { $in: ep.songList } } }
      );

      await Song.deleteMany({ _id: featuredArtists.songList });
    }

    if (!ep) {
      return res.status(404).json({ message: "No such ep" });
    }

    res.status(200).json(ep);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getMyEP = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "EP does not exist" });
  }

  const eps = await EP.find({ artist: id })
    .populate("featuredArtists")
    .populate("artist")
    .populate("songList")
    .sort({ createdAt: -1 });
  if (!eps) {
    return res.status(404).json({ error: "You don't have any song" });
  }
  res.status(200).json(eps);
};

module.exports = {
  getEP,
  getMyEP,
  getAllEP,
  createEP,
  updateEP,
  deleteEP,
};
