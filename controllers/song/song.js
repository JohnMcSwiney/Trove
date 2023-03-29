const Song = require("../../models/songs/song");
const Artist = require("../../models/artists/artist");
const Album = require("../../models/albums/album");
const EP = require("../../models/ep/ep");
const mongoose = require("mongoose");
const { json } = require("express");
const song = require("../../models/songs/song");

const createSong = async (req, res) => {
  console.log("createSong", req.body);

  switch (req.body.releaseType) {
    case "Album" || "EP":
      try {
        const artist = await Artist.findOne({ artistName: req.body.artist });

        console.log(artist);

        if (!artist) {
          throw new Error("Artist not found");
        }

        const album = await Album.findOne({ albumName: req.body.album });

        if (!album) {
          throw new Error("Album not found");
        }

        if (req.body.featuredArtists == null || !req.body.featuredArtists) {
          const song = new Song({
            ...req.body,
            artist: artist._id,
            album: album._id,
            releaseType: "Album",
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
        } else {
          const featuredArtists = await Promise.all(
            req.body.featuredArtists.map(async (name) => {
              const featuredArtist = await Artist.findOne({ artistName: name });

              if (!featuredArtist) {
                throw new Error("Featured artist not found");
              }

              return featuredArtist._id;
            })
          );

          console.log(featuredArtists);

          const song = new Song({
            ...req.body,
            artist: artist._id,
            album: album._id,
            releaseType: "Album",
            featuredArtists: featuredArtists,
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
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
      }
      break;

    case "Single":
      try {
        const artist = await Artist.findOne({ artistName: req.body.artist });
        console.log(artist);

        if (!artist) {
          throw new Error("Artist not found");
        }

        if (req.body.featuredArtist == null || !req.body.featuredArtists) {
          console.log(req.body.featuredArtist);

          //check why is it null (did user decide to do solo or other artists cannot be found?);

          const song = new Song({
            ...req.body,
            artist: artist._id,
          });

          artist.songList.push(song._id);

          await song.save();
          await artist.save();
          res.status(201).json(song);
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
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
      }
      break;
    default:
      break;
  }
};

//get all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find()

      .populate("artist")
      .populate("featuredArtists")

      .populate("album")

      .populate("ep")
      .sort({ createdAt: -1 });

    res.status(200).json(songs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "fetching songs failed" });
  }
};

//get song
const getSong = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such song" });
  }

  const song = await Song.findById(id)
    .populate("artist")
    .populate("featuredArtists")
    .populate("album");

  if (!song) {
    return response.status(404).json({ error: "Song not found" });
  } else {
    console.log(song);

    response.status(200).json(song);
  }
};

const songViewed = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such song" });
  }

  try {
    const song = await Song.findById(id);
    await Song.findOneAndUpdate(
      { _id: song._id },
      { $inc: { searchCount: 1 } }
    );

    res.status(201).json({ message: "View +1" });
  } catch {
    res.status(200).json();
  }
};
//WIP
const updateSong = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    artistID,
    feartureArtists,
    album,
    ep,
    songYear,
    imgUrl,
    genre,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such song" });
  }
  try {
    const song = await Song.findById(id);

    song.title = title;
    song.releaseYear = songYear;
    song.imgUrl = imgUrl;
    song.genre = genre;

    song.featuredArtists = feartureArtists;

    const artist = await Artist.findOne({ _id: song.artist });

    if (artist._id != artistID) {
      const newArtist = await Artist.findById(artistID);
      // const primeArtist = await Artist.findOne({
      //   artistName: artistName,
      //   $where: { email: song.featuredArtists.email },
      // });
      if (!primeArtist) {
        res.status(400).json({
          error:
            "You must have them as a feature artist first before making to be the primary artist",
        });
      }
      song.featuredArtists.push(song.artist._id);
      song.artist.id = artistID;
    }

    if (!album && !ep) {
      song.album = null;
      song.ep = null;
      song.releaseType = ["single"];
    } else if (album && !ep) {
      const newAlbum = Album.findOne({ albumName: album, artist: song.artist });
      song.album = newAlbum;
      song.ep = null;
      song.releaseType = ["album"];
    } else if (!album && ep) {
      const newEP = EP.findOne({ epName: album, artist: song.artist });
      song.album = null;
      song.ep = newEP;
      song.releaseType = ["ep"];
    } else if (album && ep) {
      const newAlbum = Album.findOne({ albumName: album, artist: song.artist });
      const newEP = EP.findOne({ epName: album, artist: song.artist });
      song.album = album;
      song.ep = ep;
      song.releaseType = ["album", "ep"];
    }

    await song.save();
    const message = "Updated Song successfully";
    res.status(200).json({ song, message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // if (song.releaseType == "album") {
  //   try {
  //     const featuredArtists = await Promise.all(
  //       feartureArtists.map(async (name) => {
  //         const featuredArtist = await Artist.findOne({ artistName: name });

  //         if (!featuredArtist) {
  //           throw new Error("featured artist(s) not found");
  //         }

  //         return featuredArtist._id;
  //       })
  //     );

  //     song.title = title;
  //     song.featuredArtists = feartureArtists;
  //     song.album = album;
  //     song.ep = ep;
  //     song.releaseYear = songYear;
  //     song.imgUrl = imgUrl;
  //     song.genre = genre;
  //     await song.save();
  //     for (const featuredArtistId of featuredArtists) {
  //       const featuredArtist = await Artist.findById(featuredArtistId);

  //       featuredArtist.songList.push(song._id);

  //       featuredArtist.albumList.push(album._id);

  //       await featuredArtist.save();
  //     }
  //     const message = "Update song Successfully";
  //     res.status(200).json({ song, message });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // } else if (song.releaseType == "single") {
  //   const featuredArtists = await Promise.all(
  //     req.body.featuredArtists.map(async (name) => {
  //       const featuredArtist = await Artist.findOne({ artistName: name });

  //       if (!featuredArtist) {
  //         throw new Error("featured artist(s) not found");
  //       }

  //       return featuredArtist._id;
  //     })
  //   );

  //   if (!req.body.album || req.body.album == null) {
  //     console.log(req.params);

  //     const song = await Song.findOneAndUpdate(
  //       { _id: id },
  //       {
  //         $set: {
  //           ...req.body,
  //           artist: artist._id,
  //           album: null,
  //           featuredArtists: featuredArtists,
  //         },
  //       },
  //       { new: true }
  //     );

  //     await Album.updateOne(
  //       { _id: song.album },
  //       { $pull: { songList: song._id }, $inc: { totalTracks: -1 } }
  //     );

  //     if (!song) {
  //       return res.status(404).json({ error: "Song not found" });
  //     }

  //     console.log(song);

  //     console.log("updateSong method working");

  //     res.status(200).json(song);
  //   } else {
  //     const album = await Album.findOne({ albumName: req.body.album });

  //     if (!album) {
  //       throw new Error("album not found");
  //     }

  //     const featuredArtists = await Promise.all(
  //       req.body.featuredArtists.map(async (name) => {
  //         const featuredArtist = await Artist.findOne({
  //           artistName: name,
  //         });

  //         if (!featuredArtist) {
  //           throw new Error("featured artist(s) not found");
  //         }

  //         return featuredArtist._id;
  //       })
  //     );

  //     const song = await Song.findOneAndUpdate(
  //       { _id: id },
  //       {
  //         $set: {
  //           ...req.body,
  //           artist: artist._id,
  //           album: album._id,
  //           featuredArtists: featuredArtists,
  //         },
  //       },
  //       { new: true }
  //     );

  //     if (song.album) {
  //       album.songList.push(song._id);

  //       album.totalTracks++;

  //       song.releaseYear = album.releaseYear;

  //       await album.save();
  //     }

  //     // if (!featuredArtists.songList || !featuredArtists.albumList){

  //     //     for (const featuredArtistId of featuredArtists) {

  //     //         const featuredArtist = await Artist.findById(featuredArtistId);

  //     //         featuredArtist.songList.push(song._id);

  //     //         featuredArtist.albumList.push(album._id);

  //     //         await featuredArtist.save();
  //     //     }
  //     // }

  //     if (!song) {
  //       return res.status(404).json({ error: "Song not found" });
  //     }

  //     console.log(song);

  //     console.log("updateSong method working");

  //     res.status(200).json(song);
  //   }
  // }
};

//WIP
const deleteSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "song not found" });
  }

  try {
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

    console.log(song.featuredArtists);

    const featuredArtists = await Promise.all(
      song.featuredArtists.map(async () => {
        const featuredArtist = await Artist.findOne({
          _id: song.featuredArtists,
        });

        if (!featuredArtist) {
          throw new Error(" featured artist not found");
        }

        return featuredArtist._id;
      })
    );

    await Song.findOneAndDelete({ _id: id });

    await Artist.updateOne(
      { _id: artist._id },
      { $pull: { songList: song._id } }
    );

    for (const featuredArtistId of featuredArtists) {
      await Artist.updateOne(
        { _id: featuredArtistId },
        { $pull: { songList: song._id } }
      );
    }

    await Album.updateOne(
      { _id: album._id },
      { $pull: { songList: song._id }, $inc: { totalTracks: -1 } }
    );

    console.log("song is deleted");

    res.status(200).json({ msg: "song deleted!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getArtistSong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "This artist is not available" });
  }

  const songs = await Song.find({ artist: id })
    .sort({ createdAt: -1 })
    .populate("artist");
  if (!songs) {
    return res.status(404).json({ error: "You don't have any song" });
  }
  res.status(200).json(songs);
};

const likedSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "song not available" });
  }

  try {
    const song = await Song.findOne({ _id: id });

    if (!song) {
      console.log("song not found");

      throw new Error("song not found");
    }
    const { userID } = req.body;
    console.log(userID);
    const user = await User.findOne({ _id: userID });

    if (!user) {
      console.log("user not found");

      throw new Error("user not found");
    }

    if (song.isLoved.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "Song has already been liked by the user" });
    }

    song.isLoved.push(user._id);
    user.likedSongs.push(song._id);

    await song.save();
    await user.save();

    res.status(200).json({ message: "Song liked successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const dislikeSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "song not available" });
  }

  try {
    const song = await Song.findOne({ _id: id });

    if (!song) {
      console.log("song not found");

      throw new Error("song not found");
    }
    const { userID } = req.body;
    console.log(userID);

    const user = await User.findOne({ _id: userID });

    if (!user) {
      console.log("user not found");

      throw new Error("user not found");
    }

    if (song.isLoved.includes(user._id)) {
      song.isLoved.pop(user._id);
      user.likedSongs.pop(song._id);
    }

    await song.save();

    await user.save();

    res.status(200).json({ message: "removed like successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllSongs,
  getSong,
  getArtistSong,
  createSong,
  deleteSong,
  updateSong,
  likedSong,
  dislikeSong,
  songViewed,
};
