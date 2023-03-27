const mongoose = require("mongoose");
const Song = require("../../models/songs/song");
const Artist = require("../../models/artists/artist");
const Album = require("../../models/albums/album");
const EP = require("../../models/ep/ep");

const getAllEP = async (req, res) => {
  const eps = await EP.find({})
    .populate("songList")
    .populate("featuredArtists")
    .populate("artist")
    .populate("songList")
    .sort({ createdAt: -1 });
  res.status(200).json(eps);
};

const getEP = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ err: "No such EP" });
  }

  const ep = await EP.findById(id)
    .populate("songList")
    .populate("featuredArtists")
    .populate("artist")
    .populate("songList");

  if (!ep) {
    return res.status(400).json({ err: "No such EP" });
  }

  res.status(200).json(ep);
};

const createEP = async (req, res) => {
  const artistID = req.body.artistID;
  try {
    const artist = await Artist.findOne({ _id: artistID });

    //console.log(artist);

    if (!artist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    console.log("Request Body FT: " + req.body.featuredArtists);

    console.log("outside of if stmt");

    if (!req.body.featuredArtists || req.body.featuredArtists == null) {
      console.log("should be in here");

      console.log("inside ep method");

      const ep = new EP({
        ...req.body,
        artist: artist._id,
      });

      ep.songList = [];
      artist.epList.push(ep._id);

      await ep.save();
      await artist.save();

      res.status(201).json(ep);
    } else {
      const featuredArtists = await Promise.all(
        req.body.featuredArtists.map(async (name) => {
          const featuredArtist = await Artist.findOne({ artistName: name });

          if (!featuredArtist) {
            throw new Error("featured artist(s) not found");
          }

          return featuredArtist._id;
        })
      );

      console.log("bruhhhhh : " + featuredArtists);

      const ep = new EP({
        ...req.body,
        artist: artist._id,
        featuredArtists: featuredArtists,
      });

      ep.songList = [];
      artist.epList.push(ep._id);

      for (const featuredArtistId of featuredArtists) {
        const featuredArtist = await Artist.findById(featuredArtistId);
        featuredArtist.epList.push(ep._id);
        await featuredArtist.save();
      }

      await ep.save();
      await artist.save();

      res.status(201).json(ep);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

//WIP
const updateEP = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such ep" });
  }

  try {
    const artist = await Artist.findOne({ artistName: req.body.artist });

    if (!artist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    const songs = await Song.find({}).sort({ createdAt: -1 });

    if (!songs) {
      console.log("songs not found");

      throw new Error("Songs not found");
    }

    const songList = songs.map((song) => song._id);

    if (!req.body.featuredArtists || req.body.featuredArtists == null) {
      const ep = await EP.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body, artist: artist._id, songList: songList._id } },
        { new: true }
      );

      let disableSongs = [];

      for (const featuredArtistId of ep.featuredArtists) {
        await Artist.updateOne(
          { _id: featuredArtistId },
          { $pull: { epList: ep._id } }
        );

        await Song.updateOne(
          { _id: songList._id },
          { $pull: { featuredArtists: featuredArtistId } }
        );

        disableSongs = [
          ...disableSongs,
          ...(await Song.find({
            ep: ep._id,
            featuredArtists: featuredArtistId,
          })),
        ];

        for (const song of disableSongs) {
          song.isPublished = false;
          await song.save();
        }
      }

      if (!ep) {
        return res.status(404).json({ message: "No such ep" });
      }

      res.status(200).json(ep);
    } else {
      const featuredArtists = await Promise.all(
        req.body.featuredArtists.map(async (name) => {
          const featuredArtist = await Artist.findOne({ artistName: name });

          if (!featuredArtist) {
            throw new Error("featured artist(s) not found");
          }

          return featuredArtist._id;
        })
      );

      console.log(featuredArtists);

      const ep = await EP.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            ...req.body,
            artist: artist._id,
            songList: songs._id,
            featuredArtists: featuredArtists,
          },
        },
        { new: true }
      );

      for (const featuredArtistId of featuredArtists) {
        const featuredArtist = await Artist.findById(featuredArtistId);

        featuredArtist.epList
          ? console.log("do not update ep list")
          : featuredArtist.epList.push(ep._id);

        await featuredArtist.save();
      }

      // const disableSongs = [];

      // for (const featuredArtistId of ep.featuredArtists) {

      //     await Artist.updateOne({ _id: featuredArtistId }, { $pull: { epList: ep._id } });

      //     ep.featuredArtists.epList ? console.log("do not update eplist") : ep.featuredArtists.epList.push(ep._id);

      //     //await Song.updateOne({ _id: songs._id }, { $pull: { featuredArtists: featuredArtistId } });

      //     disableSongs = [...disableSongs, ...(await Song.find({ ep: ep._id, featuredArtists: featuredArtistId }))];

      //     for (const song of disableSongs) {
      //         song.isPublished = false;
      //         await song.save();
      //     }

      //     ep.featuredArtists.save();
      // }

      if (!ep) {
        return res.status(404).json({ message: "No such ep" });
      }

      res.status(200).json(ep);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
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

  const eps = await EP.find({ artist: id }).sort({ createdAt: -1 });
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
