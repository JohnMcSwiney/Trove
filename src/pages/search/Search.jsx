import React from "react";
import Song from "../../components/song detail/Song";
const Search = () => {
  const [songs, setSongs] = React.useState(null);
  const [albums, setAlbums] = React.useState(null);
  const [songData, setSongData] = React.useState(null);
  const songAPI = React.useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/songs/");
      const json = await response.json();

      if (response.ok) {
        setSongs(json);
      }
    };

    fetchSongs();
  }, []);

  const albumAPI = React.useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch("/api/albums");
      const json = await response.json();
      if (response.ok) {
        setAlbums(json);
      }
    };
    fetchAlbums();
  }, []);
  return (
    <div className="search-page container">
      <div className="songs">
        {songs &&
          songs.map((data) => (
            <Song key={data._id} song={data} setSongData={setSongData} />
          ))}
      </div>

      <div>
        <h1>Album</h1>
        {albums &&
          albums.map((data) => (
            <div>
              {data.albumName}
              {data.artist.artistName}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
