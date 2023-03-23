import React, { useState } from "react";

// Component for displaying individual song info
export default function SongInfo(props) {
  //object songs
  // song file
  // song name

  // added song
  React.useEffect(() => {
    props.setSongs([...props.songs,  { songId: props.i, title: "", songFile: props.item } ])
    
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
      } 

  }
  );
  props.setSongs(titleChange);

  }

//   const handleSongTitleChange = (e) => {
//     props.songs.map(song => {
//       if (song.songId === props.i) {
//         // No change
//         return{
//         ...song,
//         title: e.target.value
//         };
//       } else {
//         // Return a new circle 50px below
//         return 
//         song
//         ;
//       }

//   }
//   )
// }

  return (
    <div className="uploadmusic--song--info" key={props.id}>
      <div className="upload--music--songfile--name">
        {props.songFile[props.i] && (
          <>
            <label>{props.songFile[props.i].name}</label>
            <button onClick={handleRemoveSong}>Remove</button>
          </>
        )}
      </div>
      <div>
        <input
          type="text"
          name={props.songFile[props.i].name}
          placeholder="Song Title"
          onChange={handleSongTitleChange}
        ></input>
        <textarea
          value={props.featuredArtists}
          name="artistName"
          placeholder="Featured Artists"
          onChange={props.handleFeaturedArtists}
        />
        {console.log("first FT: " + props.featuredArtists)}
        {/* {console.log("songs AREEE" + props.songs[props.i]?.songId)} */}

        {/* <br />
                {/* <h3>{props.title}</h3> */}
        {/* {console.log("index: " + [props.i])}
                {console.log("file: " + props.songFile[props.i])}
                {console.log("file name: " + props.songFile[props.i].name)}
                {console.log("Props title: " + props.title)} */}
        {/* {console.log("Props title[0]: " + props.title[0])} */}

        {/* <input type="text" name={`songName` + props.i} value={props.title[`songName` + props.i]} placeholder="Song Title" onChange={props.handleTitle}></input> */}
      </div>
    </div>
  );
              
}
