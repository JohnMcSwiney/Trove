const Song = require("../../models/song model/song-model");
const Artist = require("../../models/artist model/artist-model");
const Album = require("../../models/album model/album-model");
const EP = require("../../models/ep model/ep-model");

const mongoose = require("mongoose");

const createSong = async (req, res) => {
  console.log("createSong", req.body);

  const artistID = req.body.artistID;
  let success = "";

  try {
    // artist id check
    const artist = await Artist.findOne({ _id: artistID });

    const artistId = artist._id;

    if (!artist) {
      throw new Error("Artist not found");
    }

    if (!req.body.releaseType) {
      res.status(400).json({ error: "Please enter a avalid year" });
    }
    if (req.body.releaseType === "single") {
      console.log(req.body.releaseType);
      success = "Created a single song successfully";

      if (req.body.featuredArtists == null || !req.body.featuredArtists) {
        console.log(req.body.featuredArtist);

        console.log("songFile" + req.body.songFile);

        if (!req.body.songFile) {
          return res.status(500).json({ error: "You do not have the song" });
        }
        const song = new Song({
          ...req.body,
          artist: artistId,
        });

        artist.songList.push(song._id);

        await song.save();
        await artist.save();

        res.status(201).json({ song, success });
      } else {
        console.log("featured artists: " + req.body.featuredArtists);

        const song = new Song({
          ...req.body,
          artist: artist._id,
          releaseType: "single",
          featuredArtists: req.body.featuredArtists,
        });

        for (const artist of req.body.featuredArtists) {
          const fArtist = await Artist.findById(artist);

          if (!fArtist) {
            res
              .status(404)
              .json({ error: "This artist is not on our platform." });
          }

          fArtist.songList.push(song._id);
          await fArtist.save();
        }

        artist.songList.push(song._id);

        await song.save();
        await artist.save();
        res.status(201).json({ song, success });
      }
    } else if (req.body.releaseType === "album") {
      success = "Created an album successfully";

      const album = await Album.findOne({ albumName: req.body.album });

      if (!album) {
        res.status(404).json({ error: "Album does not exist" });
      }

      const albumId = album._id;

      if (req.body.featuredArtists == null || !req.body.featuredArtists) {
        const song = new Song({
          ...req.body,
          artist: artistId,
          album: albumId,
          releaseType: "album",
        });

        if (song.album) {
          album.songList.push(song._id);

          song.genre = album.albumGenre;

          song.releaseYear = album.releaseYear;

          await album.save();
        }

        console.log("after song is made");

        artist.songList.push(song._id);

        await song.save();

        console.log("BONGUGSS");

        await artist.save();
        res.status(201).json({ song, success });
      } else {
        const song = new Song({
          ...req.body,
          artist: artist._id,
          album: album._id,
          releaseType: "album",
          featuredArtists: req.body.featuredArtists,
        });

        for (const artist of req.body.featuredArtists) {
          const fArtist = await Artist.findById(artist);

          if (!fArtist) {
            res
              .status(404)
              .json({ error: "This artist is not on our platform." });
          }

          fArtist.songList.push(song._id);
          await fArtist.save();
        }

        if (song.album) {
          album.songList.push(song._id);

          song.genre = album.albumGenre;

          song.releaseYear = album.releaseYear;

          await album.save();
        }

        artist.songList.push(song._id);

        await song.save();
        await artist.save();
        res.status(201).json({ song, success });
      }
    } else if (req.body.releaseType === "ep") {
      const ep = await EP.findOne({ epName: req.body.ep });
      success = "Created an EP successfully";
      if (!ep) {
        res.status(404).json({ error: "EP does not exist." });
      }

      const epId = ep._id;

      if (req.body.featuredArtists == null || !req.body.featuredArtists) {
        console.log("before song is made");

        const song = new Song({
          ...req.body,
          artist: artistId,
          ep: epId,
          releaseType: "ep",
        });

        if (song.ep) {
          ep.songList.push(song._id);

          song.genre = ep.epGenre;

          song.releaseYear = ep.releaseYear;

          await ep.save();
        }

        console.log("after song is made");

        artist.songList.push(song._id);

        await song.save();

        console.log("BONGUGSS");

        await artist.save();
        res.status(201).json({ song, success });
      } else {
        const song = new Song({
          ...req.body,
          artist: artist._id,
          ep: epId,
          releaseType: "single",
          featuredArtists: req.body.featuredArtists,
        });

        for (const artist of req.body.featuredArtists) {
          const fArtist = await Artist.findById(artist);

          if (!fArtist) {
            res
              .status(404)
              .json({ error: "This artist is not on our platform." });
          }

          fArtist.songList.push(song._id);
          await fArtist.save();
        }

        if (song.ep) {
          ep.songList.push(song._id);

          song.releaseYear = ep.releaseYear;

          await ep.save();
        }

        artist.songList.push(song._id);

        await song.save();
        await artist.save();
        res.status(201).json({ song, success });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//get all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find({})

      .populate("featuredArtists", "artist")

      .populate("album")
      .populate("ep")
      .sort({ createdAt: -1 });

    console.log("getAllSongs method working");

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

  const song = await Song.findById(id).populate(
    "featuredArtists",
    "artistName"
  );

  if (!song) {
    return response.status(404).json({ error: "Song not found" });
  } else {
    console.log(song);

    console.log("getOneSong method working");

    response.status(200).json(song);
  }
};
// get My song
const getMySong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "You have not sign in" });
  }

  const songs = await Song.find({ artist: id }).sort({ createdAt: -1 });
  if (!songs) {
    return res.status(404).json({ error: "You don't have any song" });
  }
  res.status(200).json(songs);
};

// get artist's TOP song
const getMyTopSong = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "You have not sign in" });
  }

  const songs = await Song.find({ artist: id }).sort({ createdAt: -1 });
  if (!songs) {
    return res.status(404).json({ error: "You don't have any song" });
  }

  let topSong = null;

  for (const song of songs) {
    if(song.searchCount && song.searchCount > topSong.searchCount || !topSong) {
      topSong = song;
    }
    console.log(song.searchCount)

  }
    
  res.status(200).json(topSong);
}; 

//WIP
const updateSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such song" });
  }

  switch (req.body.releaseType) {
    case "album" || "ep":
      try {
        const artist = await Artist.findOne({ artistName: req.body.artist });

        if (!artist) {
          throw new Error("artist not found");
        }

        const album = await Album.findOne({ albumName: req.body.album });

        if (!album) {
          throw new Error("album not found");
        }

        const featuredArtists = await Promise.all(
          req.body.featuredArtists.map(async (name) => {
            const featuredArtist = await Artist.findOne({ artistName: name });

            if (!featuredArtist) {
              throw new Error("featured artist(s) not found");
            }

            return featuredArtist._id;
          })
        );

        const song = await Song.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              ...req.body,
              artist: artist._id,
              album: album._id,
              featuredArtists: featuredArtists,
            },
          },
          { new: true }
        );

        for (const featuredArtistId of featuredArtists) {
          const featuredArtist = await Artist.findById(featuredArtistId);

          featuredArtist.songList.push(song._id);

          featuredArtist.albumList.push(album._id);

          await featuredArtist.save();
        }

        if (!song) {
          return res.status(404).json({ error: "Song not found" });
        }

        console.log(song);

        console.log("updateSong method working");

        res.status(200).json(song);

        // if (!req.body.featuredArtists || req.body.featuredArtists == null) {

        //     const song = await Song.findOneAndUpdate(
        //         { _id: id },
        //         { $set: { ...req.body, artist: artist._id, album: album._id } },
        //         { new: true }
        //     );

        //     for (const featuredArtistId of song.featuredArtists) {

        //         await Artist.updateOne({ _id: featuredArtistId }, { $pull: { songList: song._id } });

        //         await Song.updateOne({ _id: song._id }, { $pull: { featuredArtists: featuredArtistId } });
        //     }

        //     if (!song) {

        //         return res.status(404).json({ error: "Song not found" });
        //     }

        //     console.log(song);

        //     console.log("updateSong method working");

        //     res.status(200).json(song);

        // }
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
      }
      break;

    case "single":
      try {
        const artist = await Artist.findOne({ artistName: req.body.artist });

        if (!artist) {
          throw new Error("artist not found");
        }

        const featuredArtists = await Promise.all(
          req.body.featuredArtists.map(async (name) => {
            const featuredArtist = await Artist.findOne({ artistName: name });

            if (!featuredArtist) {
              throw new Error("featured artist(s) not found");
            }

            return featuredArtist._id;
          })
        );

        if (!req.body.album || req.body.album == null) {
          console.log(req.params);

          const song = await Song.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                ...req.body,
                artist: artist._id,
                album: null,
                featuredArtists: featuredArtists,
              },
            },
            { new: true }
          );

          await Album.updateOne(
            { _id: song.album },
            { $pull: { songList: song._id }, $inc: { totalTracks: -1 } }
          );

          if (!song) {
            return res.status(404).json({ error: "Song not found" });
          }

          console.log(song);

          console.log("updateSong method working");

          res.status(200).json(song);
        } else {
          const album = await Album.findOne({ albumName: req.body.album });

          if (!album) {
            throw new Error("album not found");
          }

          const featuredArtists = await Promise.all(
            req.body.featuredArtists.map(async (name) => {
              const featuredArtist = await Artist.findOne({ artistName: name });

              if (!featuredArtist) {
                throw new Error("featured artist(s) not found");
              }

              return featuredArtist._id;
            })
          );

          const song = await Song.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                ...req.body,
                artist: artist._id,
                album: album._id,
                featuredArtists: featuredArtists,
              },
            },
            { new: true }
          );

          if (song.album) {
            album.songList.push(song._id);

            album.totalTracks++;

            song.releaseYear = album.releaseYear;

            await album.save();
          }

          // if (!featuredArtists.songList || !featuredArtists.albumList){

          //     for (const featuredArtistId of featuredArtists) {

          //         const featuredArtist = await Artist.findById(featuredArtistId);

          //         featuredArtist.songList.push(song._id);

          //         featuredArtist.albumList.push(album._id);

          //         await featuredArtist.save();
          //     }
          // }

          if (!song) {
            return res.status(404).json({ error: "Song not found" });
          }

          console.log(song);

          console.log("updateSong method working");

          res.status(200).json(song);
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
      }
    default:
      break;
  }
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

module.exports = {
  getAllSongs,
  getMySong,
  getMyTopSong,
  getSong,
  createSong,
  deleteSong,
  updateSong,
};
