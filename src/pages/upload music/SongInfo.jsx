import React, { useState } from "react";

// Component for displaying individual song info
export default function SongInfo(props) {
  const handleRemoveSong = () => {
    props.setSongFile(props.songFile.filter((_, i) => i !== props.i));
    props.setToUploadSongs(props.toUploadSongs.filter((_, i) => i !== props.i));
  };

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
          name="songName"
          placeholder="Song Title"
          onChange={props.handleTitle[props.i]}
        ></input>
        <textarea
          value={props.featuredArtists}
          name="artistName"
          placeholder="Featured Artists"
          onChange={props.handleFeaturedArtists}
        />
        {console.log("first FT: " + props.featuredArtists)}

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
