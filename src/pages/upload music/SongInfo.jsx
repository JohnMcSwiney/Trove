import React, { useState } from "react";

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
        <input
          type="text"
          value={props.featuredArtists}
          name="artistName"
          placeholder="Featured Artists"
          onChange={props.handleFeaturedArtists}
        />
        </div>
        {/* </div> */}
        {console.log("first FT: " + props.featuredArtists)}
        {console.log("songs AREEE" + JSON.stringify(props.songs))}

      </div>
    </div>
  );
              
}
