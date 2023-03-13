import React from "react";
import {createContext, useContext} from "react";

import { NavLink } from "react-router-dom";
import { MusicContext } from "../../contexts/MusicContext";
import "./song.css";

const Song = ({ song }) => {
  const { currentSong, updateCurrentSong, currentSongData } =
    React.useContext(MusicContext);
  // const [currentSongforPlayer, setCurrentSongforPlayer] = React.useState(null);
  

  const handlePlaySong = () => {
    if (currentSong && currentSong._id === song._id) {
      updateCurrentSong(null);

    } else {
      updateCurrentSong(song);
      // currentSongData(song); // added songData to pass song's data

    }
  };

  React.useEffect(() => {
    if (currentSong && currentSong._id === song._id) {  
    } else {
    }
  }, [currentSong, song]);

  // Pass the callback to update the current song URL to the onClick handler
  
  return (
    <div
      key={song._id}
      className="song-info-div container"
      onClick={() => handlePlaySong(song.songUrl)}
    >
      <div className="song-img-div">
        <img src={song.imgUrl} alt={song.title} />
      </div>
      <span>{song.title}</span>
      <NavLink to={`/artist/${song.artist._id}`} artist={song.artist._id}>
        {song.artist.artistName}
      </NavLink>
      <p>{song.genre}</p>
    </div>
  );
};

export default Song;
