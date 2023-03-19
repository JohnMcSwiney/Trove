import React from "react";
import { createContext, useContext } from "react";

import { NavLink } from "react-router-dom";
import { MusicContext } from "../../contexts/MusicContext";
import "./song.css";

const Song = ({ song }) => {
  const { currentSong, updateCurrentSong, currentSongData } =
    React.useContext(MusicContext);
  // const [currentSongforPlayer, setCurrentSongforPlayer] = React.useState(null);

  const handlePlaySong = () => {
    if (currentSong && currentSong._id === song._id) {
      return;
    } else {
      updateCurrentSong(song);
      fetchSongView();
    }
  };

  // Pass the callback to update the current song URL to the onClick handler

  const fetchSongView = async () => {
    const response = await fetch(`/api/songs/update-view/${song._id}`, {
      method: "PATCH",
    });
    const json = await response.json();
  };

  return (
    <div
      key={song._id}
      className="song-info-div container"
      onClick={() => {
        handlePlaySong();
        // song.songUrl
      }}
    >
      <div className="song-img-div">
        <img src={song.imgUrl} alt={song.title} />
      </div>
      <span>{song.title}</span>
      <NavLink to={`/artist/${song.artist._id}`}>
        {song?.artist?.artistName}
      </NavLink>
      <p>{song.genre}</p>
    </div>
  );
};

export default Song;
