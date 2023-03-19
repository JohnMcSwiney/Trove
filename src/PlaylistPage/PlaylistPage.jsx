import React from "react";

import "./PlaylistPage.css";
// import NavBar from './nav bar/NavBar';
import albumsongs from "../data/albumsongs.json";
import PlaylistSong from "./PlaylistSong";

//fetching
import { useParams } from "react-router-dom";

// User's Top Genres
export default function PlaylistPage(props) {
  let { id } = useParams();

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

  return (
    <section>
      {/* HEADER */}

      {/* ALBUM COVER / INFO */}
      <div className="playlist--info">
        <div className="playlist--song--cover">
          <img src={playlist && playlist.playlistCoverUrl} alt="playlist" />
        </div>
        <div className="playlist--stats--info">
          <h3>{playlist && playlist.playlistName}</h3>
          <div className="playlist--release--info">
            {/* <h5>2014</h5> */}
            <h6>PLAYLIST</h6>
          </div>
          <h4>{playlist && playlist.playlistCreator.displayName}</h4>
        </div>
      </div>

      {/* SONGS */}
      {/* <div className="album--song">
                <div className="album--tiny--cover">
                        <img src="../assets/reccover.jpg" alt="albumcover"/>
                </div>                
                <div className="album--song--info">
                        <h5>Fireball</h5>
                        <h6>Pitbull</h6>
                </div>
                <div className="album--song--options">
                        <img src="../assets/heart.png" id="album--song--heart" alt="heart"/>
                        <img src="../assets/share.png" id="album--song--share" alt="share"/>
                        <img src="../assets/more.png" id="album--song--more" alt="more"/>
                </div>           

            </div> */}

      <div className="playlist--songs">
        {playlist &&
          playlist.songList.map((song) => {
            return <PlaylistSong key={song._id} song={song} />;
          })}
      </div>

      {/* <NavBar /> */}
    </section>
  );
}
