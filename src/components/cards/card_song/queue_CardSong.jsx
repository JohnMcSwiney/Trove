import React from "react";
import { createContext, useContext } from "react";

import { NavLink } from "react-router-dom";
import { MusicContext } from "../../../contexts/MusicContext";
import "./queue_CardSong.css";
import RemoveFromQueueBtn from "../../QueueBtns/removeFromQueue";

const Queue_CardSong = ({ song, index }) => {
    const {
        displayMusicBar,
        queuePosition,
        updateQueue,
        addToQueue,
        currentSong,
        updateCurrentSong,
        currentSongData,
        playlists,
        play_list,
        updateQueuePosition,
        updatePlay_listPosition,
      } = React.useContext(MusicContext);
  // const [currentSongforPlayer, setCurrentSongforPlayer] = React.useState(null);
      
  const handlePlaySong = () => {
    if (currentSong && currentSong._id === song._id) {
      return;
    } else {
      updatePlay_listPosition(index);  
      updateCurrentSong(song);
      fetchSongView()
    }
  };

  // const handleQueue = (song_in_id) => {
  //   const newPos = play_list.map((song) => {if(song._id === currentSong._id){
  //       console.log(song.songName);
  //   }});
  // }

  // Pass the callback to update the current song URL to the onClick handler

  const fetchSongView = async () => {
    const response = await fetch(`/api/songs/update-view/${song._id}`, {
      method: "PATCH",
      // body: `${song._id}`
    });
    const json = await response.json()
  }
  const useEffect = () => { 
    
  }

  return (
    <div
      key={song._id}
      className="
      song-info-div"
      // className="
      // queue--song-info-div 
      // song-info-div"
      onClick={() => {
        handlePlaySong()
        // handleQueue(song._id)
        // song.songUrl

      }}
    ><div className="queueTitleCont">
      <h2> {index+1}</h2>
    </div>
      
      <div className="song-img-div-ver2">
        <img src={song.imgUrl} alt={song.title} className="queue--song-img-searchcard2"/>
      </div>
      
      <div className="song-text-div">
        <div className="titlesongcard">
          {song.title}
        </div>
        <div className="artistsongcard">
          {/* <NavLink to={`/artist/${song.artist._id}`} className="queue--song-art-link"> */}
            {song.artist.artistName}
          {/* </NavLink> */}
        </div>
      </div>

      
    </div>
  );
};

export default Queue_CardSong;