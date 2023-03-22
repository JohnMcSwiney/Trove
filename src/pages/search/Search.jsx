import React, { createContext, useContext } from "react";
import Song from "../../components/song detail/Song";
import SearchSongCard2 from "../../components/cards/search_items/searchSongCard/searchSongCard2";
import { MusicContext } from "../../contexts/MusicContext";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";

import LoadingSearch from "../../components/loadingitems/loadingSearch/LoadingSearch";
import "./SearchPage.css";

const Search = () => {
  const [songs, setSongs] = React.useState(null);
  const [albums, setAlbums] = React.useState(null);
  const [songData, setSongData] = React.useState(null);

  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState({});

  const [done, setDone] = React.useState(true);

  const searchAPI = React.useEffect(() => {
    // const fetchSearch = () => {
    const fetchSearch = async () => {
      if (search == "") {
        setDone(true);
        return;
      } else {
        setDone(false);
        setTimeout(() => {
          fetch(`/api/search/${search}`)
            .then((response) => response.json())
            .then((json) => {
              setSearchResult(json);
              setDone(true);
            });
        }, 500);
      }
    };
    fetchSearch();
  }, [search]);

  return (
    <div className="searchCont">
      <div className="searchInpCont">
        <GoSearch className="searchIcon" />
        <form className="search-form">
          <input
            type="text"
            className="searchBox"
            onChange={(e) => setSearch(e.target.value)}
            // onKeyDown={setDone(false)}
            value={search}
            placeholder={" Search for artists, albums and songs"}
          ></input>
        </form>
      </div>
      <div>
        {!done ? (
          <LoadingSearch />
        ) : (
          <div>
            {search.length > 0 &&
              (searchResult.songs?.length ||
                0 + searchResult.artists?.length ||
                0 + searchResult.albums?.length ||
                0) === 0 && (
                <div className="search-not-found">
                  <h3>No result found for "{search}"</h3>
                </div>
              )}

            {searchResult.artists?.length > 0 && search.length > 0 && (
              <div className="artSearchContainer">
                <h2 className="artSearchHeader">Artists</h2>
                {searchResult.artists.map((artist) => (
                  <div key={artist._id} className="searchArtistCard">
                    <div className="artImgNameContSearch">
                      <div className="searchArtistImg-border">
                        <img
                          src={artist.url}
                          className="searchArtist-avatar"
                          alt="avatar"
                        />
                      </div>
                      <div className="artistNameCont">
                        <NavLink to={`/artist/${artist._id}`}>
                          {artist.artistName}
                        </NavLink>
                      </div>
                    </div>
                    <h3 className="artSearchSongHeader">Songs</h3>
                    {searchResult.songs
                      .filter((song) => song.artist._id === artist._id)
                      .map((song) => (
                        <SearchSongCard2
                          key={song._id}
                          song={song}
                          setSongData={setSongData}
                        />
                      ))}
                  </div>
                ))}
              </div>
            )}

            {searchResult.albums?.length > 0 && search.length > 0 && (
              <div>
                <h2>Albums</h2>
                {searchResult.albums.map((album) => (
                  <div key={album._id}>
                    <NavLink to={`/albumpage/${album._id}`}>
                      {album.albumName}
                    </NavLink>
                  </div>
                ))}
              </div>
            )}

            {searchResult.songs?.length > 0 && search.length > 0 && (
              <div>
                <h2>Songs</h2>
                {searchResult.songs.map((song) => (
                  <Song key={song._id} song={song} setSongData={setSongData} />
                ))}

                <div>
                <h2>Also Appears In:</h2>
                {searchResult.songs
                
                  .filter((song) => song.album)
                  .map((song) => (
                    
                      <div>
                        <NavLink to={`/albumpage/${song?.album?._id}`}>
                          {song.album?.albumName}
                        </NavLink>
                      </div>
                    
                  ))}
                  </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
