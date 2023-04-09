import React, { useState } from "react";
import "./Artist.css";

import CardPlaylist from "../../components/cards/card_playlist/CardPlaylist";
import CardAlbum from "../../components/cards/card_album/CardAlbum";
import FeaturedArtist from "../../components/featured_artist/FeaturedArtist";
import GenreCard from "../../components/cards/card_genre/CardGenre";
import SearchSongCard2 from "../../components/cards/search_items/searchSongCard/searchSongCard2";
import SearchAlbumCard from "../../components/cards/search_items/searchAlbumCard/searchAlbumCard";
import DiscoveryGame from "../../components/discoverygame/DiscoveryGame";
import Popup from "reactjs-popup";
import Song from "../../components/song detail/Song";
import { useParams } from "react-router-dom";
import { useFollowArtist } from "../../hooks/user-hooks/useFollowArtist";
import { Navigate, useNavigate, Link } from "react-router-dom";
import TopSongCard from "./TopSongCard";
// import ErrorBoundary from "./ErrorBoundary"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
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

  const { follow, followError, isFollowLoading } = useFollowArtist();
  const [isFollowed, setIsFollowed] = useState(false);
  const followHandler = () => {
    setIsFollowed(!isFollowed);
    if (!isFollowed) {
      follow(id);
    }
  };

  const navigate = useNavigate();
  function redirectFollowers() {
    navigate(`/followers/${artist._id}`);
  }

  const [topSong, setTopSong] = React.useState([]);
  React.useEffect(() => {
    const fetchMyTopSong = async () => {
      const response = await fetch(
        `/api/songs/artist-topsearch/${artist?._id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setTopSong(json);
      }
    };
    fetchMyTopSong();
  }, [artist?._id]);

  return (
    <div className="Artistpage-container ">
      <div className="Artistpage-pfp_name_follower_bio_cont bg-fglass-1">
        <div className="Artistpage-test-container">
          <div className="Artistpage-borderuserimg">
            <div className="Artistpage-user-img">
              <img src={artist?.artistImg}></img>
            </div>
          </div>
          <div className="Artistpage-name_follower_cont">
            <div className="Artistpage-txt-container">
              <h1>{artist?.artistName}</h1>
            </div>
            <div
              onClick={redirectFollowers}
              className="Artistpage-follower_cont"
            >
              <button onClick={followHandler}>Follow</button>
              <div>
                <h2>{artist?.followers.length}</h2>
                <h1>Followers</h1>
              </div>
            </div>
          </div>
        </div>
        {/* 
        <div className="artist-profile-bio-cont">
          <p className="artist-profile-bio">{artist?.bio}</p>
          <Popup
            trigger={<button className="btn"> Show More </button>}
            modal
            closeOnDocumentClick
          >
            {(close) => (
              <div className="Artistpage-bioOnClickCont">
                <div className="Artistpage-modalTitle">
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
                <div className="Artistpage-bioContBio">
                  <span>{artist.bio}</span> 
                </div>
              </div>
            )}
          </Popup>
        </div>
         */}
      </div>

      <div className="Artistpage-artist-showcase-lg Artistpage-mar-t">
        <h1>Top Songs </h1>
        <div className="topSongCardContCont">
          {topSong &&
            topSong?.map((song, index) => (
              <ErrorBoundary>
                <TopSongCard
                  key={song._id}
                  index={index}
                  name={song?.title}
                  cover={song?.imgUrl}
                  song={song}
                />
              </ErrorBoundary>
            ))}
        </div>
      </div>

      <div className="Artistpage-account-splitter"></div>
      {artist?.albumList?.length > 0 && (
        <div className="Artistpage-artist-showcase">
          <h1>Albums</h1>
          <div className="flex gap-4 ">
            {artist?.albumList &&
              artist?.albumList?.length > 0 &&
              artist?.albumList.map(
                (album) =>
                  album.isVerified && (
                    <SearchAlbumCard
                      key={album._id}
                      id={album._id}
                      name={album.albumName}
                      artist={artist?.artistName}
                      cover={album.albumArt}
                    />
                  )
              )}
          </div>
        </div>
      )}

      {artist?.epList?.length > 0 && (
        <div className="Artistpage-artist-showcase">
          <h1>EPs</h1>
          <div className="flex gap-4 ">
            {artist?.epList &&
              artist?.epList?.length > 0 &&
              artist?.epList.map(
                (ep) =>
                  ep.isVerified && (
                    <SearchAlbumCard
                      key={ep._id}
                      id={ep._id}
                      name={ep.epName}
                      artist={artist?.artistName}
                      cover={ep.epArt}
                    />
                  )
              )}
          </div>
        </div>
      )}

      <div className="Artistpage-account-splitter"></div>
      <div className="Artistpage-artist-showcase">
        <h1>All Songs</h1>
        <div className="CardCont artistprofile--songs">
          {artist?.songList &&
            artist?.songList?.length > 0 &&
            artist?.songList.map(
              (song) =>
                song.isVerified && (
                  <SearchSongCard2 song={song} key={song._id} />
                )
            )}
        </div>
      </div>
      <div className="Artistpage-account-splitter"></div>

      {/* <div className="Artistpage-account-splitter"></div>
      <div className="Artistpage-artist-showcase">
        <h1></h1>
      </div> */}
    </div>
  );
};

export default Artist;
