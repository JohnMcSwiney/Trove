import React from "react";
import { createContext, useContext } from "react";

import { NavLink } from "react-router-dom";
import { MusicContext } from "../../../../contexts/MusicContext";
import "./searchSongCard2.css";

const SearchSongCard2 = ({ song }) => {
  const { currentSong, updateCurrentSong, currentSongData } =
    React.useContext(MusicContext);
  // const [currentSongforPlayer, setCurrentSongforPlayer] = React.useState(null);

  const handlePlaySong = () => {
    if (currentSong && currentSong._id === song._id) {
      return;
    } else {
      updateCurrentSong(song);
      fetchSongView()
    }
  };

  // Pass the callback to update the current song URL to the onClick handler

  const fetchSongView = async () => {
    const response = await fetch(`/api/songs/update-view/${song._id}`, {
      method: "PATCH",
      // body: `${song._id}`
    });
    const json = await response.json()
  }


  return (
    <div
      key={song._id}
      className="song-info-div container"
      onClick={() => {
        handlePlaySong()
        // song.songUrl

      }}
    >
      <div className="song-img-div">
        <img src={song.imgUrl} alt={song.title} className="song-img-searchcard2"/>
      </div>
      
      <div className="song-text-div">
        <div className="titlesongcard">
          {song.title}
        </div>
        <div className="artistsongcard">
          <NavLink to={`/artist/${song.artist._id}`} className="song-art-link">
            {song.artist.artistName}
          </NavLink>
        </div>
      </div>

      <div className="genreCont">
        {song.genre}
      </div>
    </div>
  );
};

export default SearchSongCard2;
