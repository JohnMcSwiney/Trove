import React from "react";
import Song from "../../components/song detail/Song";
const Search = () => {
  const [songs, setSongs] = React.useState(null);
  React.useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/songs/");
      const json = await response.json();

      if (response.ok) {
        setSongs(json);
      }
    };

    fetchSongs();
  }, []);
  return (
    <div className="search-page container">
      <div className="songs">
        {songs && songs.map((data) => <Song key={data._id} song={data} />)}
      </div>
    </div>
  );
};

export default Search;
