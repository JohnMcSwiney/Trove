import React from "react";
import "./audience.css";
import { useArtistAuthContext } from "../../hooks/useArtistAuthContext";
import { NavLink } from "react-router-dom";

import FiveSearched from "./charts/fiveSearched";
import FiveLoved from "./charts/fiveLoved";

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
  const [artistSongs, setArtistSongs] = React.useState([]);
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

  // artist top song
  const [topSong, setTopSong] = React.useState([]);
  React.useEffect(() => {
    const fetchMyTopSong = async () => {
      const response = await fetch(`/api/songs/artist-topsearch/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.ok) {
        setTopSong(json);
      }
    };
    fetchMyTopSong();
  }, [id]);

  const [mostLoved, setMostLoved] = React.useState([]);
  React.useEffect(() => {
    const fetchMyMostLovedSong = async () => {
      const response = await fetch(`/api/songs/artist-toploved/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.ok) {
        setMostLoved(json);
      }
    };
    fetchMyMostLovedSong();
  }, [id]);

  return (
    <div className="artist--audience">
      <div className="artist--welcome">
        {/* <h5>Hello, {artist ? <span className="artist--namespan">{artist?.artistName}</span> : <NavLink to={"/login"}>please sign in.</NavLink>} </h5> */}

        {artistAudience ? (
          <h5>
            {" "}
            <span className="artist--audience--searcheffect">
              {artistAudience?.artistName}'s
            </span>
            <span className="artist--namespan"> Audience</span>{" "}
          </h5>
        ) : (
          <div className="artist--welcome">
            Hello, <NavLink to={"/login"}>please sign in.</NavLink>
          </div>
        )}
      </div>
      {/* {artistAudience ? 
      
      <div className="artist--audience--stats">
          <h2>
          You were searched for {<span className="artist--namespan">{artistAudience.searchCount}</span>} times.
          </h2> 
          <h2>
          You Currently Have {<span className="artist--namespan">{artistAudience.followers.length}</span>} Fans.
          </h2> 
          <h2>
          Your Most Searched Song is {<span className="artist--namespan">
            {topSong[0]?.title}</span>} 
          </h2> 
          <h2>
          Your Most Loved Song is {<span className="artist--namespan">{mostLoved[0]?.title}</span>} 
          </h2>
          <h2>
          Your Most Searched Songs are {<span className="artist--namespan">
          <br />1. {topSong[0]?.title}
          <br />2. {topSong[1]?.title}
          <br />3. {topSong[2]?.title}
          <br />4. {topSong[3]?.title}
          <br />5. {topSong[4]?.title}
          </span>} 
          </h2> 
          <h2>
          Your Most Loved Songs are {<span className="artist--namespan">
          <br />1. {mostLoved[0]?.title}
          <br />2. {mostLoved[1]?.title}
          <br />3. {mostLoved[2]?.title}
          <br />4. {mostLoved[3]?.title}
          <br />5. {mostLoved[4]?.title}
          </span>} 
          </h2> 
          
      </div>
          : null
      } */}

      <div className="artist--audience--content">
        <div class="grid-container">
          <div class="item1">
            <FiveSearched topSong={topSong} />
          </div>
          <div class="item2">
            <h1>{artistAudience?.searchCount} Searches</h1>
          </div>
          <div class="item3">
            <h1>
              {
                <span className="artist--namespan">
                  {artistAudience?.followers?.length}
                </span>
              }{" "}
              Fans
            </h1>
          </div>
          <div class="item4">
            <FiveLoved mostLoved={mostLoved} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audience;
