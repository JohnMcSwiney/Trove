import React,{useRef,} from "react";
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
  const audioRef = useRef();
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes} : ${returnedSeconds}`;
  };
  return (
    <div
      key={song._id}
      className="song-info-div"
      onClick={() => {
        handlePlaySong()
        // song.songUrl

      }}
    >
      <audio ref={audioRef} src={song.songUrl}></audio>
      <div className="song-img-div-ver2">
        <img src={song.imgUrl} alt={song.title}/>
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
      <div className="durationCont">
        {calculateTime(Math.floor(audioRef?.current?.duration))}
      </div>
      <div className="genreCont">
        {song.genre}
      </div>
      
    </div>
  );
};

export default SearchSongCard2;