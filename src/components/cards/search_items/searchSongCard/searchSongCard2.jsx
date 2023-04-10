import React, { useRef, useState } from "react";
import { createContext, useContext } from "react";

import { NavLink } from "react-router-dom";
import { MusicContext } from "../../../../contexts/MusicContext";
import "./searchSongCard2.css";

//for testing atm
import AddToQueueBtn from "../../../QueueBtns/addToQueueBtn";
import { useEffect } from "react";
const SearchSongCard2 = ({ song }) => {
  const {
    currentSong,
    updateCurrentSong,
    currentSongData,
    clearQueue,
    clearPlay_list,
  } = React.useContext(MusicContext);
  const[duration, setDuration] = useState("");
  // const [currentSongforPlayer, setCurrentSongforPlayer] = React.useState(null);

  const handlePlaySong = () => {
    if (currentSong && currentSong._id === song._id) {
      return;
    } else {
      updateCurrentSong(song);
      clearQueue();
      clearPlay_list();
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
  const audioRef = useRef();
  // let duration = "";
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    setDuration(Math.floor(`${returnedMinutes} : ${returnedSeconds}`)); 
    
    return `${returnedMinutes} : ${returnedSeconds}`;
  };
  
  // duration =  Math.floor(calculateTime(audioRef?.current?.duration));
  // console.log(duration);
  React.useEffect(()=>{

  },[audioRef])
  return (
    <div key={song._id} className="song-info-div">
      <audio ref={audioRef} src={song.songUrl}></audio>
      <div
        className="song-img-div-ver2"
        onClick={() => {
          handlePlaySong();
          // song.songUrl
        }}
      >
        <img
          src={song.imgUrl}
          alt={song.title}
          className="queue--song-img-searchcard2"
        />
      </div>

      <div className="song-text-div">
        <div
          className="titlesongcard"
          onClick={() => {
            handlePlaySong();
            // song.songUrl
          }}
        >
          {song.title}
        </div>
        <div className="artistsongcard">
          <NavLink to={`/artist/${song.artist._id}`} className="song-art-link">
            {song?.artist?.artistName}
          </NavLink>

          {song.featuredArtists && song.featuredArtists.length > 0 && (
            <div className="featured-artists-container">
              {song.featuredArtists
                .map((featuredArtist) => (
                  <NavLink
                    key={featuredArtist._id}
                    to={`/artist/${featuredArtist._id}`}
                    className="song-art-link"
                  >
                    {featuredArtist.artistName}
                  </NavLink>
                ))
                .join(", ")}
            </div>
          )}
        </div>
      </div>
      <div>
        
      
      <div className="durationCont">
        <h4>
        {/* {calculateTime(Math.floor(audioRef?.current?.duration))} */}
        {duration && duration}
        </h4>
      </div>
      <div className="genreCont">{song.genre}</div>
      </div>
      <AddToQueueBtn song={song} />
    </div>
  );
};

export default SearchSongCard2;
