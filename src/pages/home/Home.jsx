import React from "react";

const Home = () => {
  const [artistSongs, setArtistSongs] = React.useState(null);
  const [artistAlbums, setArtistAlbum] = React.useState(null);
  const artistID = localStorage.getItem("artistID");
  React.useEffect(() => {
    const fetchMySongs = async () => {
      const response = await fetch(`/api/songs/artist-songs/${artistID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.ok) {
        setArtistSongs(json);
      }
    };
    fetchMySongs();
  }, []);

  React.useEffect(() => {
    const fetchMyAlbums = async () => {
      const albumResponse = await fetch(
        `/api/albums/artist-album/${artistID}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
    };
  }, []);

  return (
    <div>
      <h5>Hello </h5>
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