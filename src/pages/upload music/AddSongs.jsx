// import React from "react"
import React, { useState } from "react";
import ReactDOM from "react-dom";

import SongInfo from "./SongInfo";

import LoadingSign from "../../components/load/loading";
import MusicSubmitted from "./MusicSubmitted";

// Add Songs (song files, song title)
export default function AddSongs(props) {
  React.useEffect(() => {
    console.log("files changed!");
    console.log(props.files);
  }, [props.files]);

  const { releaseType } = props;

  return (
    <div className="uploadmusic--column uploadmusic--song--form">
      <div className="uploadmusic--addsongs--form">
        {/* <h2>ADD SONGS</h2> */}
        <div className="uploadmusic--upload--songfile">
          <label className="uploadmusic--custom-song-upload">
            {releaseType === "single" ? (
              <input
                type="file"
                name="songFile"
                value=""
                accept="audio/*"
                className="uploadmusic--hide--file"
                onChange={props.handleSongFileChange}
              />
            ) : (
              <input
                type="file"
                name="songFile"
                value=""
                accept="audio/*"
                className="uploadmusic--hide--file"
                multiple
                onChange={props.handleSongFileChange}
                required
              />
            )}
            <label>Upload Songs</label>
            {/* <img src="../../assets/upload_icon.png" id="upload--icon" alt="upload_icon" /> */}
          </label>
          <div className="uploadmusic--add--song">
            {/* When a song is added, display the song title input */}
            {props.songFile &&
              props.songFile.map((item, index) => {
                // props.setSongs([...props.songs,  { id: index, title: "", songFile: item } ])
                // console.log("songs are..." + props.songs)
                return (
                  <SongInfo
                    key={index}
                    id={index}
                    {...item}
                    i={index}
                    songF={item}
                    songFile={props.songFile}
                    title={props.title}
                    handleTitle={props.handleTitle}
                    handleFeaturedArtists={props.handleFeaturedArtists}
                    featuredArtists={props.featuredArtists}
                    handleSongFileChange={props.handleSongFileChange}
                    setSongFile={props.setSongFile}
                    toUploadSongs={props.toUploadSongs}
                    setToUploadSongs={props.setToUploadSongs}
                    songs={props.songs}
                    setSongs={props.setSongs}
                    artists={props.artists}
                  />
                );
              }
              ) 
              }
          </div>
          {props.isUploading ? 
                    <div className="uploadmusic--loadingprogress">
                    <div className="uploadmusic--loadinganimation">
                    <LoadingSign />
                    </div>
                   
                   <div className="uploadmusic--loadingtext">
                    <h5>Hold on, we're uploading your music!</h5>
                    <h6>{Math.round(props.uploadProgress)}% Complete</h6>
                   </div>
      
                </div>
          : null}

          {props.submitted ? 
                  <div className="uploadmusic--loadingtext">
                    <h5>Your Music was Uploaded!</h5>
                    <h6>100% Complete</h6>
                   </div>
            : null
        
          }

          <div className="uploadmusic--navigate--form--btns uploadmusic--navigate--add--songs">
            <div
              className="uploadmusic--back--btn uploadmusic--musicdets--btn"
              onClick={() => props.handleFormNavigation("MusicDetails")}
            >
              <button
                className={
                  "uploadmusic--gradient--btn uploadmusic--submit--btn"
                }
                onClick={() => props.handleFormNavigation("MusicDetails")}
                value="musicdet"
                name="musicdet"
              >
                Music Details
              </button>
            </div>
            <div className="uploadmusic--next--btn uploadmusic--finish--btn">
              <input
                type="submit"
                value="Submit"
                className="uploadmusic--gradient--btn uploadmusic--submit--btn"
                onClick={props.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
