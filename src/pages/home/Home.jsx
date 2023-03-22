import React from "react";
import { useArtistAuthContext } from "../../hooks/useArtistAuthContext";

const Home = () => {
  const [artistSongs, setArtistSongs] = React.useState(null);
  const [artistAlbums, setArtistAlbum] = React.useState(null);
  const artistInfo = JSON.parse(localStorage.getItem("artist"));
  const id = artistInfo ? artistInfo.id : null;
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

  React.useEffect(() => {
    const fetchMyAlbums = async () => {
      const albumResponse = await fetch(`/api/albums/artist-albums/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
    };
    fetchMyAlbums();
  }, [id]);

  const { artist } = useArtistAuthContext();
  return (
    <div>
      <h5>Hello {artist?.artistName} </h5>
      <div class="mysong">
        {artistSongs &&
          artistSongs.map((song) => (
            <div>
              <p key={song._id}>{song.title}</p>
              <p>{song.isVerified}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
