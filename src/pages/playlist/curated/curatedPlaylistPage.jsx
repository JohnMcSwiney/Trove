import React from "react";

import "../PlaylistPage.css";
import "./curated.css";
// import NavBar from './nav bar/NavBar';
import albumsongs from "../../../data/albumsongs.json";
import PlaylistSong from "../PlaylistSong";
import SearchSongCard2 from "../../../components/cards/search_items/searchSongCard/searchSongCard2";
import { MusicContext } from "../../../contexts/MusicContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import LoadingSearch from "../../../components/loadingitems/loadingSearch/LoadingSearch";
import { BsPlay, BsPause } from "react-icons/bs";

import AddPlaylist_ToQueue from "../addPlaylist_ToQueue";
//fetching
import { useParams } from "react-router-dom";

// User's Top Genres
export default function CuratedPlaylistPage(props) {
  let { id } = useParams();

  const userId = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).id
    : null;

  const {
    currentSong,
    updateCurrentSong,
    play_list,
    updatePlay_list,
    updateQueue,
    addToQueue,
    clearPlay_list,
    updatePlay_listPosition,
    isPlay_Global,
    toggleIsPlay_G,
  } = React.useContext(MusicContext);

  const [playlist, setPlaylist] = React.useState([]);

  React.useEffect(() => {
    if (playlist === undefined && clicks !== 1) {
      console.log(play_list);
      setClicks(clicks + 1);
    }
    if (playlist?.songList === play_list) {
      console.log("we have a match");
    }
  }, []);
  const togglePlayPause = () => {
    toggleIsPlay_G();
  };

  React.useEffect(() => {
    const fetchPlaylist = async () => {
      setDone(false);
      setTimeout(async () => {
        const response = await fetch(`/api/curated/${id}`, {
          method: "GET",
        });
        const json = await response.json();
        if (response.ok) {
          setPlaylist(json);
          setDone(true);
        }
      }, 500);
    };
    fetchPlaylist();
  }, [id]);

  const [playlistCreator, setPlaylistCreator] = React.useState(null);
  const [done, setDone] = React.useState(false);
  const [clicks, setClicks] = React.useState(0);

  const handlePlayPlaylist = () => {
    if (play_list !== playlist?.songList) {
      setClicks(clicks + 1);
      return;
    }
  };
  React.useEffect(() => {
    // This code will run after every render
    setPlaylistasPlay_list();
  }, [clicks]); // Only re-run the effect if count changes

  const setPlaylistasPlay_list = () => {
    if (clicks !== 0) {
      if (play_list !== playlist?.songList) {
        if (playlist?.songList.length === 0) {
          return;
        } else {
          console.log("setting Play_list");
          updatePlay_list(playlist?.songList);
        }
      }
    }
  };
  return (
    <section className="curated-containter-ver2">
      {/* HEADER */}
      {/* ALBUM COVER / INFO */}
      <div className="bg-fglass--1--curated">
        <div
          className="curated--info"
          // onClick={handlePlayPlaylist()}
        >
          <div className="curatedPlayPauseQueueBtnCont">
            {clicks !== 0 && play_list === playlist?.songList ? (
              <button
                className="curated--playbtn"
                // id='playPauseBtn'
                onClick={togglePlayPause}
              >
                {isPlay_Global ? (
                  <BsPause />
                ) : (
                  <BsPlay className="playIconPlayList" />
                )}
              </button>
            ) : (
              <button
                className="curated--playbtn"
                onClick={handlePlayPlaylist}
              >
                <BsFillPlayFill className="playIconPlayList" />
              </button>
            )}
            <div></div>
            <AddPlaylist_ToQueue
              input={playlist?.songList}
              className="AddPlaylist_ToQueue"
            />
          </div>
          {!done ? (
            <LoadingSearch />
          ) : (
            <div className='curated--song--cover'>
              <img src={playlist && playlist.curatedPlaylistCoverUrl} alt='playlist' />
            </div>
          )}
          {!done ? (
            <LoadingSearch />
          ) : (
            <div className='curated--stats--info'>
              <div className='curated--release--info'>
                <h6><strong>Curated</strong> Playlist</h6>
                {/* <div className="playlist--release--filler--div">|</div><h5>2014</h5> */}
                <div className="playlist--release--filler--div">|</div>
                <h4>By: {playlist && playlist.curatedPlaylistCreator}</h4>
              </div>
              <h3>{playlist && playlist.curatedPlaylistName}</h3>
              <h5>{playlist.curatedPlaylistBio}</h5>
            </div>
          )}
        </div>
      </div>

      {/* SONGS */}
      <div className="bg-fglass--2--curated">
        {!done ? (
          <LoadingSearch />
        ) : (
          <div className="curated--songs">
            <ul className="curated--songlist--container">
              {playlist &&
                playlist?.songList?.map((song, index) => {
                  return (
                    <li className="curated--song--container">
                      <h1>{index + 1}</h1>
                      <SearchSongCard2 key={song._id} song={song} />
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
      <div onLoad={handlePlayPlaylist}></div>
      {/* <NavBar /> */}
    </section>
  );
}
