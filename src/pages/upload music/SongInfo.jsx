import React, { useState } from "react";
import Select from 'react-select'
// Component for displaying individual song info
export default function SongInfo(props) {
  //object songs
  // song file
  // song name

  // added song
  React.useEffect(() => {
    props.setSongs((prevSongs) => [ ...prevSongs, { songId: props.i, title: "", featuredArtists:[] } ])
    
  }, []);

  const handleRemoveSong = () => {
    props.setSongFile(props.songFile.filter((_, i) => i !== props.i));
    props.setToUploadSongs(props.toUploadSongs.filter((_, i) => i !== props.i));
    props.setSongs(props.songs.filter((_, i) => i !== props.i));

  };

  function handleSongTitleChange(e) {
    console.log(props.songs[props.i]?.title)
    const titleChange = props.songs.map((song) => {
      if (song.songId === props.i) {
        // No change
        return{
        ...song,
        title: e.target.value
        };
      } else {
        return song;
      }

  }
  );
  props.setSongs(titleChange);

  }
    const handleSelectChange = (selectedOptions) => {
    console.log(selectedOptions)
    if (!selectedOptions) {
      props.setFeaturedArtists([]);
      return;
    }
    const selectedList = [];
    for (const item of props.artists) {
      for (var i = 0; i < selectedOptions.length; i++) {
        if (
          selectedOptions[i].value === item._id ||
          (selectedOptions[i].artist && selectedOptions[i].id === item._id)
        ) {
          selectedList.push(item._id);
          break;
        }
      }
    }
    // props.setFeaturedArtists(selectedList);
    

    function handleSongfArtistChange(e) {
      console.log(props.songs[props.i]?.featuredArtists)
      const fArtistChange = props.songs.map((song) => {
        if (song.songId === props.i) {
          // No change
          return{
          ...song,
          featuredArtists: selectedList
          };
        } else {
          return song;
        }
  
    }
    );
    props.setSongs(fArtistChange);
    
  }
  handleSongfArtistChange();
  
    }

  return (
    <div className="uploadmusic--song--info" key={props.id}>
      <div className="uploadmusic--delsong">
          <img src="../assets/xsongsymbol.png" alt="deletesongicon" onClick={handleRemoveSong} />
      </div>
      <div className="uploadmusic--songfile--name">
       {props.songFile[props.i] && (
          <>
            <label>{props.songFile[props.i].name}</label>
            {/* <button onClick={handleRemoveSong}>Remove</button> */}
          </>
        )}
      </div>
      <div className="uploadmusic--songinfo--inputs">
      <div className="uploadmusic--song--name">
      {/* <div> */}
        <input
          type="text"
          name={props.songFile[props.i].name}
          placeholder="Song Title"
          onChange={handleSongTitleChange}
        ></input>
        </div>
        <div className="uploadmusic--songfile--ftartists">
                       <label htmlFor="search">Featured Artists: 
                <Select
                  id="search"
                  options={props.artists&& props.artists.length>0 && props.artists.map((artist) => ({
                    value: artist.artistName,
                    label: (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={artist.artistImg}
                          alt={artist.artistName}
                          width="30"
                          height="30"
                          style={{ marginRight: "10px" }}
                        />
                        {artist.artistName}
                      </div>
                    ),
                    id: artist?._id,
                    artist: artist,
                    artistName: artist.artistName,
                  }))}
                  isMulti
                  className="uploadmusic--basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select an artist"

                  onChange={handleSelectChange}
                />
                 </label>
        </div>
        {/* </div> */}
        {console.log("first FT: " + props.featuredArtists)}
        {console.log("songs AREEE" + JSON.stringify(props.songs))}

      </div>
    </div>
  );
              
}
