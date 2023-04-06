import React from "react";

// Playlist's Song Component
export default function PlaylistSong({ song }) {
  const [likedSong, setLikedSong] = React.useState("../assets/heart.png");

  function handleLike() {
    if (likedSong === "../assets/heart.png") {
      setLikedSong("../assets/likedHeart.png");
    } else {
      setLikedSong("../assets/heart.png");
    }
  }

  const handleBS = () => {
    console.log(song);
  };
  return (
    <div className="playlist--song" onClick={handleBS}>
      <div className="playlist--tiny--cover">
        <img src={song?.imgUrl} alt="playlistcover" />
        <img src="../assets/playmask.png" id="playmask" alt="albumcover" />
      </div>
      <div className="playlist--song--info">
        <h5>{song?.title}</h5>
        <h6>{song?.artist.artistName}</h6>
        <h5>
          <span>{song?.duration}</span>
        </h5>
      </div>
      <div className="playlist--song--options">
        <img
          src={likedSong}
          id="playlist--song--heart"
          alt="heart"
          onClick={() => handleLike()}
        />
        <img src="../assets/share.png" id="playlist--song--share" alt="share" />
        <img src="../assets/more.png" id="playlist--song--more" alt="more" />
      </div>
    </div>
  );
}
