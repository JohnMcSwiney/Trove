import React from "react";
import "./audience.css"
import { useArtistAuthContext } from "../../hooks/useArtistAuthContext";
import { NavLink } from "react-router-dom";

const Audience = () => {

  const { artist } = useArtistAuthContext();

  return (
  <div className="artist--audience">
      <div className="artist--welcome">
      {/* <h5>Hello, {artist ? <span className="artist--namespan">{artist?.artistName}</span> : <NavLink to={"/login"}>please sign in.</NavLink>} </h5> */}


      {artist ? <h5><span className="artist--namespan">{artist?.artistName}</span>'s Audience</h5> :
        <div className="artist--welcome">
        Hello, <NavLink to={"/login"}>please sign in.</NavLink>
        </div>
      }
      </div>

  </div>
  
  );
};

export default Audience;
