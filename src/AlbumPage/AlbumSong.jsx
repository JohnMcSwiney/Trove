import React from "react";

// Album's Song Component
export default function AlbumSong(props) {
  const [song, setSong] = React.useState(null);

  React.useEffect(() => {
    const fetchSong = async () => {
      const songResponse = await fetch(`/api/songs/${props}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const songJson = await songResponse.json();
      if (songResponse.ok) {
        setSong(songJson);
      }
    };
    fetchSong();
  }, []);

  console.log(props.idN);
  console.log(song);
  const [likedSong, setLikedSong] = React.useState("../assets/heart.png");

  function handleLike() {
    if (likedSong === "../assets/heart.png") {
      setLikedSong("../assets/likedHeart.png");
    } else {
      setLikedSong("../assets/heart.png");
    }
  }

  return (
    <div className="playlist--song">
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
