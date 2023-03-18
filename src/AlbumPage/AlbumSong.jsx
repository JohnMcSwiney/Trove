import React from "react";

// Album's Song Component
export default function AlbumSong(props) {

  const [song, setSong] = React.useState(null);

  React.useEffect(() => {
    const fetchSong = async () => {
      const songResponse = await fetch(`/api/songs/${props.idName}`, {
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
    <div className="album--song">
      <div className="album--tiny--cover">
        <img src={song && song.imgUrl} alt="albumcover" />
        <img src="../assets/playmask.png" id="playmask" alt="albumcover" />
      </div>
      <div className="album--song--info">
        <h5>{song && song.title}</h5>
        <h6>{song && song.artist.artistName}</h6>
        <h5>
          {/* <span>{song && song.duration}</span> */}
        </h5>
      </div>
      <div className="album--song--options">
        <img
          src={likedSong}
          id="album--song--heart"
          alt="heart"
          onClick={() => handleLike()}
        />
        <img src="../assets/share.png" id="album--song--share" alt="share" />
        <img src="../assets/more.png" id="album--song--more" alt="more" />
      </div>
    </div>
  );
}
