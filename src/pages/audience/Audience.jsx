import React from "react";
import "./audience.css"
import { useArtistAuthContext } from "../../hooks/useArtistAuthContext";
import { NavLink } from "react-router-dom";

const Audience = () => {

  // artist
  const [artistAudience, setArtistAudience] = React.useState(null);
  const artistInfo = JSON.parse(localStorage.getItem("artist"));
  const id = artistInfo ? artistInfo.id : null;
  React.useEffect(() => {
    const fetchArtist = async () => {
      const response = await fetch(`/api/artists/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.ok) {
        setArtistAudience(json);
      }
    };
    fetchArtist();
  }, [id]);

  // artist's songs
  const [artistSongs, setArtistSongs] = React.useState(null);
  React.useEffect(() => {
    const fetchMySongs = async () => {
      const response = await fetch(`/api/songs/artist-songs/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.ok) {
        setArtistSongs(json);
      }
    };
    fetchMySongs();
  }, [id]);


  //top song 
  // const [topSong, setTopSong] = React.useState();
  // let songCount = 0;
  // React.useEffect(() => {
  //   const artistTopSong = async () => {
  //     for (const song of artistSongs) {
  //       if(song.searchCount > so) {
  //         setTopSong(song);
  //       }
      
  //     }
  //   };
  //   artistTopSong();
  // }, []);


  return (
  <div className="artist--audience">
      <div className="artist--welcome">
      {/* <h5>Hello, {artist ? <span className="artist--namespan">{artist?.artistName}</span> : <NavLink to={"/login"}>please sign in.</NavLink>} </h5> */}


      {artistAudience ? <h5>{artistAudience?.artistName}'s<span className="artist--namespan"> Audience</span> </h5> :
        <div className="artist--welcome">
        Hello, <NavLink to={"/login"}>please sign in.</NavLink>
        </div>
      }
      </div>
      {artistAudience ? 
      
      <div className="artist--audience--stats">
          <h2>
          You were searched for {<span className="artist--namespan">{artistAudience.searchCount}</span>} times.
          </h2> 
          <h2>
          You Currently Have {<span className="artist--namespan">{artistAudience.followers.length}</span>} Fans.
          </h2> 

      </div>
          : null
      }



  </div>

  );
};

export default Audience;
