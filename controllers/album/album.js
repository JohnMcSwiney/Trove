const mongoose = require("mongoose");
const Song = require("../../models/songs/song");
const Artist = require("../../models/artists/artist");
const Album = require("../../models/albums/album");

const getAllAlbum = async (req, res) => {
  try {
    const albums = await Album.find({})
      .populate("artist")
      .populate("featuredArtists")
      .populate("songList")

      .sort({ createdAt: -1 });

    const MonthDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Get all users created after the date 7 days ago
    const newAlbums = await Album.find({
      createdAt: { $gte: MonthDaysAgo },
    }).sort({ createdAt: -1 });

    // Get the number of users created before the date 7 days ago
    const oldAlbumsCount = await Album.countDocuments({
      createdAt: { $lt: MonthDaysAgo },
    });

    // Calculate the total increase or decrease in users
    const totalDiff =
      oldAlbumsCount >= 0
        ? newAlbums.length - oldAlbumsCount
        : newAlbums.length;

    const percentageChange =
      oldAlbumsCount > 0
        ? ((totalDiff / oldAlbumsCount) * 100).toFixed(2)
        : "N/A";

    const changeType = totalDiff >= 0 ? "increase" : "decrease";
    res.status(200).json({ albums, totalDiff, percentageChange, changeType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ err: "No such Album" });
  }

  const album = await Album.findById(id)
    .populate("artist")
    .populate("featuredArtists")
    .populate("songList");

  if (!album) {
    return res.status(400).json({ err: "No such Album" });
  }

  await Album.findOneAndUpdate(
    { _id: album._id },
    { $inc: { searchCount: 1 } }
  );

  res.status(200).json(album);
};

const createAlbum = async (req, res) => {
  try {
    const artist = await Artist.findOne({ email: req.body.artist });

    console.log(artist);

    if (!artist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    if (!req.body.featuredArtists) {
      const album = new Album({
        ...req.body,
        artist: artist._id,
      });

      album.songList = [];
      artist.albumList.push(album._id);

      await album.save();
      await artist.save();

      res.status(201).json(album);
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

      const album = new Album({
        ...req.body,
        artist: artist._id,
        featuredArtists: featuredArtists,
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
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

//WIP
const updateAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such album" });
  }

  try {
    const artist = await Artist.findById(id);

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
      const album = await Album.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body, artist: artist._id, songList: songList._id } },
        { new: true }
      );

      let disableSongs = [];

      for (const featuredArtistId of album.featuredArtists) {
        await Artist.updateOne(
          { _id: featuredArtistId },
          { $pull: { albumList: album._id } }
        );

        await Song.updateOne(
          { _id: songList._id },
          { $pull: { featuredArtists: featuredArtistId } }
        );

        disableSongs = [
          ...disableSongs,
          ...(await Song.find({
            album: album._id,
            featuredArtists: featuredArtistId,
          })),
        ];

        for (const song of disableSongs) {
          song.isPublished = false;
          await song.save();
        }
      }

      if (!album) {
        return res.status(404).json({ message: "No such album" });
      }

      res.status(200).json(album);
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

      const album = await Album.findOneAndUpdate(
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

        featuredArtist.albumList
          ? console.log("do not update album list")
          : featuredArtist.albumList.push(album._id);

        await featuredArtist.save();
      }

      // const disableSongs = [];

      // for (const featuredArtistId of album.featuredArtists) {

      //     await Artist.updateOne({ _id: featuredArtistId }, { $pull: { albumList: album._id } });

      //     album.featuredArtists.albumList ? console.log("do not update albumlist") : album.featuredArtists.albumList.push(album._id);

      //     //await Song.updateOne({ _id: songs._id }, { $pull: { featuredArtists: featuredArtistId } });

      //     disableSongs = [...disableSongs, ...(await Song.find({ album: album._id, featuredArtists: featuredArtistId }))];

      //     for (const song of disableSongs) {
      //         song.isPublished = false;
      //         await song.save();
      //     }

      //     album.featuredArtists.save();
      // }

      if (!album) {
        return res.status(404).json({ message: "No such album" });
      }

      res.status(200).json(album);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

//WIP
const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such album" });
  }

  try {
    const album = await Album.findById(id);

    if (!album) {
      throw new Error("album not found");
    }

    const artist = await Artist.findOne({ _id: album.artist._id });

    if (!artist) {
      console.log("artist not found");

      throw new Error("Artist not found");
    }

    // const songs = await Promise.all(album.songList.map(async () => {

    //     const song = await Song.findOne({ _id: album.songs });

    //     if (!song) {
    //         throw new Error(" songs not found");
    //     }

    //     return song._id;
    // }));

    const featuredArtists = await Promise.all(
      album.featuredArtists.map(async () => {
        const featuredArtist = await Artist.findOne({
          _id: album.featuredArtists,
        });

        if (!featuredArtist) {
          throw new Error(" featured artist not found");
        }

        return featuredArtist._id;
      })
    );

    await Album.findOneAndDelete({ _id: id });

    await Artist.updateOne(
      { _id: artist._id },
      { $pull: { albumList: album._id, songList: { $in: album.songList } } }
    );

    await Song.deleteMany({ _id: album.songList });

    for (const featuredArtistId of featuredArtists) {
      await Artist.updateOne(
        { _id: featuredArtistId },
        { $pull: { albumList: album._id, songList: { $in: album.songList } } }
      );

      await Song.deleteMany({ _id: featuredArtists.songList });
    }

    if (!album) {
      return res.status(404).json({ message: "No such album" });
    }

    res.status(200).json(album);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getArtistAlbum = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Album is not available" });
  }

  const albums = await Album.find({ artist: id }).sort({ createdAt: -1 });
  if (!albums) {
    return res.status(404).json({ error: "You don't have any song" });
  }
  res.status(200).json(albums);
};

module.exports = {
  getAlbum,
  getAllAlbum,
  getArtistAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
