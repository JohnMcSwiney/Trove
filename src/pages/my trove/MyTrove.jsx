import React, { useState, useEffect , useContext} from "react";


import "./UserAccStyle.css";

import tempImg from "./temp-imgs/derek.png";

import CardPlaylist from "../../components/cards/card_playlist/CardPlaylist";

import FeaturedArtist from "../../components/featured_artist/FeaturedArtist";

import GenreCard from "../../components/cards/card_genre/CardGenre";
import { BsXCircle } from "react-icons/bs";
import {
  Likeid,
  Dislikeid,
} from "../../components/discoverygame/DiscoveryGame";


import { useRemoveLikes } from "../../hooks/user-hooks/useRemoveLikes";
import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";
import { Navigate, useNavigate, Link, NavLink } from "react-router-dom";
const MyTrove = () => {
  const { user } = useAuthContext();

  const userID = JSON.parse(localStorage.getItem("user")).id;

  const [playlists, setPlaylists] = useState([]);

  React.useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch(`/api/playlists/mylist/${userID}`);
      // const response = await fetch(`/api/playlists`);
      const data = await response.json();

      setPlaylists(data);
    };
    fetchPlaylists();
  }, []);

  const navigate = useNavigate();
  const redirectCreatePlaylist = () => {
    navigate("/createPlaylist");
  };

  const [userInfo, setUserInfo] = useState([]);
  React.useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(`/api/users/${userID}`);
      const data = await response.json();

      setUserInfo(data);
    };
    fetchUserInfo();
  }, []);
  console.log(userInfo.likedSongs);
  
 

  //Work in progress but useing a modefiedversion of Dans code
  
  
/*
const [songId, setSongId] = useState('');
  const handleRemoveSong = async (songId) => {
    console.log(songId);
 
    const response = await fetch(`/api/users/${userID}/likedSongs/${songId._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({ userID }),
        body: JSON.stringify({ songId }),
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUserInfo(data);
    } else {
      console.log('Failed to remove song from liked songs.');
    }

    
  };
*/


const { handleRemoveSong, unlikeError, unlikeIsLoading } = useRemoveLikes()

// const removeLikes  = () => {
// const [songId, setSongId] = useState('');
// const [unlikeError, setUnlikeError] = useState(null);
// const [unlikeIsLoading, setunLikeIsLoading] = useState(false)
// const itsUser = localStorage.getItem("user");
// const itsUserID = itsUser ? JSON.parse(itsUser).id : null;

  
// const handleRemoveSong = async (songId) => {

//   setunLikeIsLoading(true);
//   setUnlikeError(null);

//   console.log(songId._id);
//   const response = await fetch(`/api/songs/removelike/${songId._id}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ itsUserID }),
//   });
//   const json = await response.json();

//   if (!response.ok) {
//     setUnlikeError(json.error);
//   }

//   if (response.ok) {
//     const itsUser = localStorage.getItem("user");
//     const likedSongs = itsUser ? JSON.parse(itsUser).likedSongs || [] : [];
//     const songIndex = likedSongs.indexOf(songId._id);
//     if (songIndex !== -1) {
//       likedSongs.splice(songIndex, 1);
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ ...JSON.parse(user), likedSongs })
//       );
//     }
//   }
//   setunLikeIsLoading(false);
// };
// return { handleRemoveSong, unlikeError, unlikeIsLoading };
// };

  
  return (
    <div className="container">
      <div className="myTrvcontainer ">
        <div className="pfp_name_follower_cont">
          <div className="borderuserimg">
            <img src={user?.imageURL} className="user-img"></img>
          </div>
          <div className="name_follower_cont">
            <div className="txt-container">
              <h1>{user?.displayName}</h1>
            </div>
            {/* <div className="follower_cont">
              <div>
                <h2>{tempUser1.followers}</h2>
                <h1>Followers</h1>
              </div>
              <button>Follow</button>
            </div> */}
          </div>
        </div>

        <div className="account-showcase">
          <div className="showcase-title-cont">
            <h1>Playlists:</h1>
            <div className="mytrove-splitter"></div>
          </div>
          <div className="showcase-items-cont">
            <button className="newPlaylistBtn" onClick={redirectCreatePlaylist}>
              <div className="newPlaylistBtnText">Create New Playlist</div>
              <div className="newPlaylistPlusBtn">+</div>
            </button>
            {playlists &&
              playlists.length > 0 &&
              playlists.map((playlist) => (
                <div className="CardCont">
                  <div className="responsiveCardTest">
                    <CardPlaylist key={playlist._id} playlist={playlist} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="mytrove-splitter"></div>
        <div className="account-showcase">
          <h1>Top Genre(s):</h1>
          <div className="CardCont">
            <GenreCard color={"#fc6ff1"} name={"Pop"} percent={"50%"} />

            <GenreCard color={"#ff930f"} name={"Rap"} percent={"25%"} />

            <GenreCard color={"#ff3b0f"} name={"Rock"} percent={"25%"} />
          </div>
        </div>
        <div className="mytrove-splitter"></div>
        {userInfo?.likedSongs?.length > 0 && (
          <div className="account-showcase">
            <div className="TPlikedSongs">
              <h1>Liked Songs</h1>
              {userInfo?.likedSongs &&
                userInfo?.likedSongs.map((song) => (
                  <div key={song._id}>
                    <table className="LikeTable">
                      <tr className="LikeTable">
                        <th className="LikeTable">{song.title} - {song.artist?.artistName}</th> 
                        <th className="RemoveLikeTable">
                          <button className="RemoveLike" onClick={() => handleRemoveSong(song)} >
                            <BsXCircle/>
                          </button>
                        </th> 
                      </tr>
                    </table>
                  </div>
                ))}
            </div>
                  
            <br />
          </div>
        )}
        {/*userInfo?.dislikedSongs?.length > 0 && (
          <div className="account-showcase">
            <div className="TPdislikedSongs">
              <h1>Disliked Songs</h1>

              {userInfo?.dislikedSongs &&
                userInfo?.dislikedSongs.map((song) => (
                  <div key={song._id}>
                    <p>
                      {song.title} - {song.artist?.artistName}
                    </p>
                  </div>
                ))}
            </div>

            <br />
          </div>
          )*/}
        {/* <div className="mytrove-splitter"></div> */}
        <div className="account-showcase">
          <h1></h1>
        </div>
      </div>
    </div>
  );
};

export default MyTrove;
