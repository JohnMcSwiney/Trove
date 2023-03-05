import React from "react";
import "./song.css";
const Song = ({ song }) => {
  return (
    <div key={song._id} className="song-info-div container">
      <div className="song-img-div">
        <img src={song.imgUrl} alt={song.title} />
      </div>
      <span>{song.title}</span>
      <p>{song.artist.artistName}</p>
      <p>{song.genre}</p>
      <a href={song.songUrl}>song</a>
    </div>
  );
};

export default Song;
