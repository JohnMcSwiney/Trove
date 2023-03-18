import React, { createContext, useContext } from "react";
import Song from "../../components/song detail/Song";
import { MusicContext } from "../../contexts/MusicContext";
const Search = () => {
  const [songs, setSongs] = React.useState(null);
  const [albums, setAlbums] = React.useState(null);
  const [songData, setSongData] = React.useState(null);

  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState({});

  const searchAPI = React.useEffect(() => {
    const fetchSearch = async () => {
      const response = await fetch(`/api/search/${search}`);
      const json = await response.json();
      setSearchResult(json);
      console.log(json);
    };
    fetchSearch();
  }, [search]);
  return (
    <div>
      <div>
        <br></br>
        <form className="search-form">
          <input
            type={"text"}
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search for artists, albums and songs"
          />
          <br></br>
        </form>
      </div>
      {searchResult.artists && search.length > 0 && (
        <div>
          <h2>Artists</h2>
          {searchResult.artists.map((artist) => (
            <div key={artist._id}>
              <p>{artist.artistName}</p>
              <h3>Songs</h3>
              {searchResult.songs
                .filter((song) => song.artist._id === artist._id)
                .map((song) => (
                  <Song key={song._id} song={song} setSongData={setSongData} />
                ))}
            </div>
          ))}
        </div>
      )}

      {searchResult.albums && search.length > 0 && (
        <div>
          <h2>Albums</h2>
          {searchResult.albums.map((album) => (
            <div key={album._id}>
              <p>{album.albumName}</p>
            </div>
          ))}
        </div>
      )}

      {searchResult.songs && search.length > 0 && (
        <div>
          <h2>Songs</h2>
          {searchResult.songs.map((song) => (
            <Song key={song._id} song={song} setSongData={setSongData} />
          ))}

          {searchResult.songs.map((song) => (
            <div>
              <h2>Also Appear In</h2>
              <div>
                <a href={`/albumpage/${song?.album?._id}`}>
                  {song.album?.albumName}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
