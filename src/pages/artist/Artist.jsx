import React, { useState } from "react";
import "./Artist.css";

import CardPlaylist from "../../components/cards/card_playlist/CardPlaylist";
import CardAlbum from "../../components/cards/card_album/CardAlbum";
import FeaturedArtist from "../../components/featured_artist/FeaturedArtist";
import GenreCard from "../../components/cards/card_genre/CardGenre";
import DiscoveryGame from "../../components/discoverygame/DiscoveryGame";
import Popup from "reactjs-popup";
import Song from "../../components/song detail/Song";
import { useParams } from "react-router-dom";

const Artist = () => {
  const [likeArray, setlikeArray] = useState();
  const [dislikeArray, setdislikeArray] = useState();

  const [likedSongArray, setlikedSongArray] = useState([]);
  const [dislikedSongArray, setdislikedSongArray] = useState([]);

  let { id } = useParams();
  const [artist, setArtist] = useState(null);

  React.useEffect(() => {
    const findArtist = async () => {
      const response = await fetch(`/api/artists/${id}`);
      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
      }

      if (response.ok) {
        setArtist(json);
      }
    };
    findArtist();
  }, [id]);

  const [songs, setSongs] = React.useState([]);
  const [albums, setAlbum] = React.useState([]);

  React.useEffect(() => {
    const fetchSongs = async () => {
      const songResponse = await fetch(`/api/songs/artist-songs/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const songJson = await songResponse.json();
      if (songResponse.ok) {
        setSongs(songJson);
      }
    };
    fetchSongs();
  }, [id]);

  React.useEffect(() => {
    const fetchAlbums = async () => {
      const albumResponse = await fetch(`/api/albums/artist-albums/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const albumJson = await albumResponse.json();
      if (albumResponse.ok) {
        setAlbum(albumJson);
      }
    };
    fetchAlbums();
  }, [id]);

  return (
    <div className="myTrvcontainer ">
      <div className="pfp_name_follower_bio_cont">
        <div className="test-container">
          <div className="borderuserimg">
            {/* <img src={artist.imageURL} className="user-img"></img> */}
          </div>
          <div className="name_follower_cont">
            <div className="txt-container">
              <h1>{artist?.artistName}</h1>
            </div>
            <div className="follower_cont">
              <div>
                <h2>{artist?.followers.length}</h2>
                <h1>Followers</h1>
              </div>
              <button>Follow</button>
            </div>
          </div>
        </div>

        <div className="artist-profile-bio-cont">
          <p className="artist-profile-bio">{artist?.bio}</p>
          <Popup
            trigger={<button className="btn"> Show More </button>}
            modal
            closeOnDocumentClick
          >
            {(close) => (
              <div className="bioOnClickCont">
                <div className="modalTitle">
                  {artist?.artistName}
                  <span>'s Artist Bio </span>
                  <button
                    onClick={() => {
                      close();
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="bioContBio">
                  {/* <span>{artist.bio}</span> */}
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>

      <div className="account-splitter"></div>

      <div className="artist-showcase-lg">
        <h1>{artist?.artistName}'s Top Songs: </h1>
        <div className="CardCont"></div>
      </div>

      <div className="account-splitter"></div>
      <div className="artist-showcase">
        <h1>Albums:</h1>
        <div className="CardCont">
          {albums &&
            albums.map((data) => <CardAlbum key={data._id} album={data} />)}
        </div>
      </div>

      <div className="account-splitter"></div>
      <div className="artist-showcase">
        <h1>{artist?.artistName}'s Songs</h1>

        {songs &&
          songs.length > 0 &&
          songs.map((data) => (
            <div className="CardCont" key={data._id}>
              <Song song={data} />
            </div>
          ))}
      </div>
      <div className="account-splitter"></div>

      <div className="account-splitter"></div>
      <div className="artist-showcase">
        <h1></h1>
      </div>
    </div>
  );
};

export default Artist;
