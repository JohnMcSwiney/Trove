import React, { Component } from "react";
import "./CardPlaylist.css";

import AlbumPage from "../../../AlbumPage/AlbumPage.jsx";
import { Navigate, useNavigate, Link } from "react-router-dom";

function CardArtist({ playlist }) {
  const navigate = useNavigate();
  const redirectPlaylist = () => {
    navigate(`/playlist/${playlist._id}`);
  };

  console.log("innter", { playlist });
  return (
    <>
      <div onClick={redirectPlaylist}>
        <div className="contPlaylist">
          <div className="rounded-md m-auto  ">
            <div className="overflow-hidden">
              <img
                className="playlist-img"
                src={playlist.playlistCoverUrl}
                alt={playlist.playlistName}
              />
            </div>
          </div>

          <div className="plytxtcont">
            <div className="plytxt">
              <a className="testingplaylisttext">{playlist.playlistName}</a>
            </div>
            {/* <div className="plyUntxt">
              <a className="text">{playlist.playlistCreator}</a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default CardArtist;
