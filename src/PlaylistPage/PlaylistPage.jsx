import React from "react";

import "./PlaylistPage.css";
// import NavBar from './nav bar/NavBar';
import albumsongs from "../data/albumsongs.json";
import PlaylistSong from "./PlaylistSong";
import SearchSongCard2 from "../components/cards/search_items/searchSongCard/searchSongCard2";
import { MusicContext } from "../contexts/MusicContext";
import { Navigate, useNavigate, Link } from "react-router-dom";


//fetching
import { useParams } from "react-router-dom";

// User's Top Genres
export default function PlaylistPage(props) {
  let { id } = useParams();

  const userId = JSON.parse(localStorage.getItem("user")).id;

  const {  
    play_list,
    updatePlay_list,
    updateQueue,
    addToQueue, } =
    React.useContext(MusicContext);


  const [playlist, setPlaylist] = React.useState(null);
  React.useEffect(() => {
    const fetchPlaylist = async () => {
      const playlistResponse = await fetch(`/api/playlists/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const playlistJson = await playlistResponse.json();
      if (playlistResponse.ok) {
        setPlaylist(playlistJson);
      }
    };
    fetchPlaylist();
  }, [id]);

  const [playlistCreator, setPlaylistCreator] = React.useState(null);
  React.useEffect(() => {
    const findPlaylistCreator = async () => {
      const response = await fetch(`/api/users/${playlist.playlistCreator}`);
      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
      }

      if (response.ok) {
        setPlaylistCreator(json);
      }
    };
    findPlaylistCreator();
  }, []);
  const handlePlayPlaylist = () => {
    // console.log(playlist.songList);
    updatePlay_list(playlist.songList);
  }
  const navigate = useNavigate();
  function redirectEditPlaylist() {
    navigate(`/editplaylist/${playlist._id}`);
  };


  return (
    <section>
      {/* HEADER */}

      {/* ALBUM COVER / INFO */}
      <div className="playlist--info">
        <div className="playlist--song--cover">
          <img src={playlist && playlist.playlistCoverUrl} alt="playlist" />
          <button className="playlist--editbtn" onClick={handlePlayPlaylist}> Play </button>
        </div>
        <div className="playlist--stats--info">
          <h3>{playlist && playlist.playlistName}</h3>
          <div className="playlist--release--info">
            {/* <h5>2014</h5> */}
            <h6>PLAYLIST</h6>
          </div>
          <h4>{playlist && playlist.playlistCreator.displayName}</h4>
          { userId === playlist?.playlistCreator._id && <button className="playlist--editbtn"onClick={redirectEditPlaylist}>Edit</button>  }
        </div>
        
      </div>

      {/* SONGS */}
      <div className="playlist--songs">
        {playlist &&
          playlist.songList.map((song) => {
            return <SearchSongCard2 key={song._id} song={song} />;
          })}
      </div>

      {/* <NavBar /> */}
    </section>
  );
}
