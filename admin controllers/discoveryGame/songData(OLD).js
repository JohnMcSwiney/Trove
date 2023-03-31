const errorCallback = (err) => {
    console.log(err);
    throw new Error("decoding audio error");
  }
  //find beat and tempo of a song.
  const calcSongData = async (decodedAudioData) => {
  
    return new Promise((resolve, reject) => {
  
      console.log("should be in calcsongdata");
  
      console.log("audiodata in calcsongdata" + decodedAudioData);
  
      let audioData = [];
  
      if (decodedAudioData.numberOfChannels == 2) {
  
        let data1 = decodedAudioData.getChannelData(0);
        let data2 = decodedAudioData.getChannelData(1);
  
        for (let i = 0; i < data1.length; i++) {
          audioData[i] = (data1[i] + data2[i]) / 2;
        }
      } else {
        audioData = decodedAudioData.getChannelData(0);
      }
  
      const songData = new MusicTempo(audioData);
  
      console.log("tempo resolve: " + Math.round(songData.tempo));
      console.log("beat resolve: " + Math.round(songData.beatInterval));
  
      resolve(songData);
    })
      // .then((result) => {
      //   console.log("result: " + result);
      //   return result;
      // })
      .catch((err) => {
        console.log(err);
        reject(err);
        throw new Error("error in calcSongData");
      });
  }
  
  const fetchAudioData = async (songUrl) => {
  
    const res = await fetch(songUrl);
  
    if (!res.ok) {
      throw new Error("Failed to fetch response");
    }
  
    const buffer = await res.arrayBuffer();
  
    console.log("buffer" + buffer);
  
    const context = new AudioContext();
  
    // const decodedBuffer = await new Promise((resolve, reject) => {
    //   context.decodeAudioData(buffer, resolve, reject);
    // });
  
    const decodedBuffer = await context.decodeAudioData(buffer);
    // const channelData = decodedBuffer.getChannelData(0);
    // const audioData = new Float32Array(channelData);
  
    //return audioData;
    return decodedBuffer;
  
  }

  const loadSongs = async (user) => {

    const songData = await compareSongData(user);
  
    console.log("should be done finding songdata");
  
    // const allSongs = await Song.find()
  
    //   .populate("artist")
    //   .populate("featuredArtists")
  
    //   .populate("album")
  
    //    .sort({createdAt: -1});
  
    // if (!allSongs) {
    //   return res.status(404).send("songs not found");
    // }
  
    // let similarSongs = [];
  
    // for (const song of allSongs) {
  
    //   console.log("song in allSongs: " + song.title);
  
    //   const songURL = song.songUrl;
  
    //   console.log("songURL in allSongs: " + songURL);
  
    //   await fetch(songURL)
    //     .then(res => res.arrayBuffer())
    //     .then(buffer => {
  
    //       const context = new AudioContext();
  
    //       return context.decodeAudioData(buffer, calcSongData);
    //     });
  
    //   const songTempo = Math.round(calcSongData.tempo).toPrecision(2);
    //   const songBeat = Math.round(calcSongData.beat).toPrecision(2);
  
    //   if (songTempo == findSongData.averageTempo && songBeat == averageBeat) {
    //     similarSongs.push(song);
    //   }
    // }
  
    // for (let i = 0; i < 5; i++) {
    //   const randomSong = similarSongs[Math.floor(Math.random() * similarSongs.length)];
    //   songLimit[i] = randomSong;
    //   console.log("songlimit title: " + songLimit[i].title);
    // }
  
    // console.log("songLimit length: " + songLimit.length)
  
    // if (songLimit.length > 5) {
    //   throw new Error("Song limit cannot be greater than 5.");
    // }
  
    // return songLimit;
  
    // res.status(200).json(songLimit);
          // let tempoList = [];
      // let beatList = [];

      // const songTempo = tempo;
      // const songBeat = beatInterval;

      // // const songTempo = Math.round(calcSongData.tempo).toFixed(2);
      // // const songBeat = Math.round(calcSongData.beat).toFixed(2);

      // console.log("songTempo: " + songTempo);
      // console.log("songBeat: " + songBeat);


      // tempoList.push(songTempo);
      // beatList.push(songBeat);

      // let tempoValue = 0;
      // let beatValue = 0;

      // for (let i = 0; i < tempoList.length; i++) {
      //   tempoValue += tempoList[i];
      //   console.log("current tempoValue: " + tempoValue);
      // }

      // for (let i = 0; i < beatList.length; i++) {
      //   beatValue += beatList[i];
      //   console.log("current beatValue: " + beatValue);

      // }

      // const averageTempo = Math.round(tempoValue / user.likedSongs.length).toPrecision(2);

      // const averageBeat = Math.round(beatValue / user.likedSongs.length).toPrecision(2);

      // console.log("average tempo of user liked songs: " + averageTempo);

      // console.log("average beat of user liked songs: " + averageBeat);

      // return averageTempo, averageBeat;
    }

    // await user.likedSongs.forEach(async (songId) => {

    //   console.log("songID: " + songId);

    //   if (!mongoose.Types.ObjectId.isValid(songId)) {
    //     return res.status(404).json({ err: "No such song" });
    //   }

    //   const currentSong = await Song.findById(songId);

    //   if (!currentSong || currentSong == null) {
    //     console.log("SongID is null: " + songId);

    //     await User.updateOne(
    //       { _id: user._id },
    //       { $pull: { likedSongs: songId } }
    //     );
    //     console.log("SongID should be removed");
    //   }

    //   console.log("currentSong title: " + currentSong.title);

    //   const songURL = currentSong.songUrl;

    //   console.log("songurl in compareSongData: " + songURL);

    //   //await fetchSong(songURL);

    //   const res = await fetch(songURL);

    //   const buffer = await res.arrayBuffer();

    //   const context = new AudioContext();

    //   context.decodeAudioData(buffer, calcSongData, errorCallback);

    //   let tempoList = [];
    //   let beatList = [];

    //   const songTempo = Math.round(calcSongData.tempo).toFixed(2);
    //   const songBeat = Math.round(calcSongData.beat).toFixed(2);

    //   console.log("songTempo: " + songTempo);
    //   console.log("songBeat: " + songBeat);


    //   tempoList.push(songTempo);
    //   beatList.push(songBeat);

    //   let tempoValue = 0;
    //   let beatValue = 0;

    //   for (let i = 0; i < tempoList.length; i++) {
    //     tempoValue += tempoList[i];
    //     console.log("current tempoValue: " + tempoValue);
    //   }

    //   for (let i = 0; i < beatList.length; i++) {
    //     beatValue += beatList[i];
    //     console.log("current beatValue: " + beatValue);

    //   }

    //   const averageTempo = Math.round(tempoValue / user.likedSongs.length).toPrecision(2);

    //   const averageBeat = Math.round(beatValue / user.likedSongs.length).toPrecision(2);

    //   console.log("average tempo of user liked songs: " + averageTempo);

    //   console.log("average beat of user liked songs: " + averageBeat);

    //   return averageTempo, averageBeat;

    //   // await fetch(songURL)
    //   //   .then(res => res.arrayBuffer())
    //   //   .then(async (buffer) => {

    //   //     console.log("inside fetch songURL");

    //   //     console.log("buffer: " + buffer);

    //   //     const context = new AudioContext();

    //   //     await calcSongData();

    //   //     console.log("calcSongData value: " + calcSongData.tempo);

    //   //     return context.decodeAudioData(buffer);

    //   // let tempoList = [];
    //   // let beatList = [];

    //   // const songTempo = Math.round(calcTempo.tempo).toFixed(2);
    //   // const songBeat = Math.round(calcTempo.beat).toFixed(2);

    //   // console.log("songTempo: " + songTempo);
    //   // console.log("songBeat: " + songBeat);


    //   // tempoList.push(songTempo);
    //   // beatList.push(songBeat);

    //   // let tempoValue = 0;
    //   // let beatValue = 0;

    //   // for (let i = 0; i < tempoList.length; i++) {
    //   //   tempoValue += tempoList[i];
    //   //   console.log("current tempoValue: " + tempoValue);
    //   // }

    //   // for (let i = 0; i < beatList.length; i++) {
    //   //   beatValue += beatList[i];
    //   //   console.log("current beatValue: " + beatValue);

    //   // }

    //   // const averageTempo = Math.round(tempoValue / user.likedSongs.length).toPrecision(2);

    //   // const averageBeat = Math.round(beatValue / user.likedSongs.length).toPrecision(2);

    //   // console.log("average tempo of user liked songs: " + averageTempo);

    //   // console.log("average beat of user liked songs: " + averageBeat);

    //   // return averageTempo, averageBeat;

    //   //   });
    // });

    // let tempoList = [];
    // let beatList = [];

    // const songTempo = Math.round(calcTempo.tempo).toFixed(2);
    // const songBeat = Math.round(calcTempo.beat).toFixed(2);

    // tempoList.push(songTempo);
    // beatList.push(songBeat);

    // let tempoValue = 0;
    // let beatValue = 0;

    // for (let i = 0; i < tempoList.length; i++) {
    //   tempoValue += tempoList[i];
    // }

    // for (let i = 0; i < beatList.length; i++) {
    //   beatValue += beatList[i];
    // }

    // const averageTempo = Math.round(tempoValue / user.likedSongs.length).toPrecision(2);

    // const averageBeat = Math.round(beatValue / user.likedSongs.length).toPrecision(2);

    // console.log("average tempo of user liked songs: " + averageTempo);

    // console.log("average beat of user liked songs: " + averageBeat);

    // return averageTempo, averageBeat;