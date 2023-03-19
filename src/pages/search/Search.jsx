import React, { createContext, useContext } from "react";
import Song from "../../components/song detail/Song";
import SearchSongCard2 from "../../components/cards/search_items/searchSongCard/searchSongCard2";
import { MusicContext } from "../../contexts/MusicContext";
import { Navigate, NavLink } from "react-router-dom";
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
      
      if (search == ""){
        
        setDone(true);
        return;
      } else {
        setDone(false)
        setTimeout(() => {
          fetch(`/api/search/${search}`)
          
          .then((response) => response.json())
          .then((json) => {
            setSearchResult(json);
            setDone(true);
          });
        }, 500)
      }
      
      
      
      // const response = await fetch(`/api/search/${search}`);
      // const json = await response.json();
      // setSearchResult(json);
      // console.log(json);
    };
    fetchSearch();
  }, [search]);


  return (
    <div className="searchCont">

      <div className="searchInpCont">
      <GoSearch className="searchIcon"/> 
        <form className="search-form">
        
        <input
            type="text"
            className="searchBox"
            onChange={((e) => setSearch(e.target.value))}
            
            // onKeyDown={setDone(false)}
            value={search}
            placeholder={" Search for artists, albums and songs"}>  
          </input>
        </form>       
      </div>
      <div>
        {
          !done ? <LoadingSearch /> :
            <div> 
              {searchResult.artists && search.length > 0 && (
                <div className="artSearchContainer">
                  <h2 className="artSearchHeader">Artists</h2>
                  {searchResult.artists.map((artist) => (
                    <div key={artist._id} 
                    className="searchArtistCard">
                      <div className="artImgNameContSearch">
                        <div className='searchArtistImg-border'>
                          <img
                            src={artist.url}
                            className='searchArtist-avatar'
                            alt='avatar'
                          />
                        </div>
                        <div className="artistNameCont">
                          {artist.artistName}
                        </div>
                      </div>
                      <h3 className="artSearchSongHeader">Songs</h3>
                      {searchResult.songs
                        .filter((song) => song.artist._id === artist._id)
                        .map((song) => (
                          <SearchSongCard2 key={song._id} song={song} setSongData={setSongData} />
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
                      <NavLink to={`/albumpage/${album._id}`}>
                        {album.albumName}
                      </NavLink>
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
                        <NavLink to={`/albumpage/${song?.album?._id}`}>
                          {song.album?.albumName}
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
        }
      </div>
    </div>
  );
};

export default Search;
