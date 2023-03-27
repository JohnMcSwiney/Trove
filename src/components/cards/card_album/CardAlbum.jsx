import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CardAlbum.css";

import { Navigate, useNavigate, Link } from "react-router-dom";

function CardAlbum({ album }) {
  console.log("album", album);
  const navigate = useNavigate();
  const redirectAlbum = () => {
    navigate(`/albumpage/${album._id}`);
  };
  return (
    <ul className="bg1test" key={album?._id}>
      <li>
        <div className="bg card-alb-cont" 
        onClick={redirectAlbum}
        >
          <div className="card-alb-img-cont">
            <img className="" src={album?.albumArt} alt={album?.albumName} />
          </div>

          <div className="card-alb-text-cont">
            <a className="albtxt alb-card-text art-card-text-cont-1">
              {album?.albumName}
            </a>
            <a className="arttxt alb-card-text art-card-text-cont-2">
              {album?.artist}
            </a>
          </div>
        </div>
      </li>
    </ul>
  );
}
export default CardAlbum;
