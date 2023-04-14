import React, { useEffect, useState } from "react";
import WavesBG from "../Vector.svg";
import MusicDetails from "./MusicDetails";
import AddSongs from "./AddSongs";
import "./UploadMusic.css";
import SongInfo from "./SongInfo";
// Import the functions you need from the SDKs you need
import firebase from "./firebaseConfig";
import { async, reject } from "q";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { useUploadSong } from "../../hooks/useUploadSong";
import { useArtistAuthContext } from "../../hooks/useArtistAuthContext";

//loading
import LoadingSign from "../../components/load/loading";
import MusicSubmitted from "./MusicSubmitted";
import { isAbsolute } from "path/posix";
import { isPipelineTopicExpression } from "@babel/types";

//  ARTISTS MUSIC SUBMISSION PAGE
export default function UploadMusic(props) {
  const storage = firebase.storage();

  // State for large vs small header
  const [small, setSmall] = useState(false);
  // following states
  const [follow, setFollow] = React.useState(false);
  const [followers, setFollowers] = React.useState(200);

  const windowBreakpoint = 480;

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 200)
      );
    }
  }, []);

  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState(null);
  const [ep, setEP] = useState(null);
  const [genre, setGenre] = useState("");
  const [songFile, setSongFile] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [releaseType, setReleaseType] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [artist, setArtist] = useState("");
  const [featuredArtists, setFeaturedArtists] = useState([]);

  // Handle State Changes
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAlbumName = (e) => {
    setAlbum(e.target.value);
  };

  const handleEPName = (e) => {
    setEP(e.target.value);
  };

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleSongFileChange = (e) => {
    //setSongFile(e.target.files[0]);

    console.log("relerwerwsdfdsfds: " + releaseType);

    const MAX_SONGS = 5;

    switch (releaseType) {
      case "album":
        setSongFile(Array.from(e.target.files));
        break;

      case "ep":
        if (Array.from(e.target.files).length > MAX_SONGS) {
          alert("Cannot upload more than 5 songs for EP!");
          e.preventDefault();
        } else if (Array.from(e.target.files).length == 1) {
          alert("Must upload more than one song!");
          e.preventDefault();
        } else {
          setSongFile(Array.from(e.target.files));
        }
        break;
      case "single":
        setSongFile(Array.from(e.target.files));

      default:
        break;
    }
    console.log(songFile)
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setPreviewCover(URL.createObjectURL(e.target.files[0]));
  };

  const handleReleaseType = (e) => {
    setReleaseType(e.target.value);

    //clear state
    setSongs([]);
    setTitle("");
    setAlbum(null);
    setEP(null);
    setGenre("");
    setSongFile([]);
    setImageFile();
    setReleaseYear("");
    setFeaturedArtists([]);
  };

  const handleReleaseYear = (e) => {
    setReleaseYear(e.target.value);
  };

  const { artistLoggedIn } = useArtistAuthContext();
  const artistID = localStorage.getItem("artist")
    ? JSON.parse(localStorage.getItem("artist")).id
    : null;

  const handleFeaturedArtists = (e) => {
    const inputtedArtists = Array.from(e.target.value);

    console.log("inputtedArtists: " + inputtedArtists);

    const artistArray = inputtedArtists
      .split("/[s,]+/")
      .filter((artist) => artist.length > 0);

    setFeaturedArtists(artistArray);
  };

  // When music is submitted
  const {
    uploadMusic,
    isUploading,
    uploadProgress,
    error,
    message,
    submitted,
    setError
  } = useUploadSong();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadMusic(
        songs,
        title,
        artistID,
        ep,
        album,
        genre,
        songFile,
        imageFile,
        releaseType,
        releaseYear,
        featuredArtists
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Initial Album Cover Display
  const default_album = "../assets/default_upload.png";
  const [previewCover, setPreviewCover] = React.useState(default_album);

  // When song files changes
  let songsList = [null];
  const [toUploadSongs, setToUploadSongs] = React.useState([]);

  React.useEffect(() => {
    setToUploadSongs(songFile);

    if (songFile) {
      console.log(songFile[0]?.name);
    }
  }, [songFile]);

  console.log("toUploadSongs value: " + toUploadSongs);

  // To change page name from music details to add songs
  const [pageName, setPageName] = React.useState("MusicDetails");
  function handleFormNavigation(pageName) {
    setPageName(pageName);
  }
  const [artistData, setArtistData] = React.useState([]);
  React.useEffect(() => {
    const fetchAllArtist = async () => {
      const response = await fetch("/api/artists/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();

      if (response.ok) {
        setArtistData(json);
      }
    };
    fetchAllArtist();
  }, []);

  return (
    <section>
      {/* HEADER */}
      {error && 
      <div className="uploadmusic--error">
        <div className="uploadmusic--errormsg--header">
            <h2>ERROR</h2>
        </div>
        <div className="uploadmusic--errormsg">
            <p>{error}</p>
            <h3 onClick={() => setError(null)}>OK!</h3>
        </div>
      </div>
      } 

      { <div className="uploadmusic--error">
        <div className="uploadmusic--errormsg--header">
            <h2>ERROR</h2>
        </div>
        <div className="uploadmusic--errormsg">
            <p>{error}</p>
            <h3 onClick={() => setError(null)}>OK!</h3>
        </div>
      </div> 
      }


      <div className="uploadmusic--upload--form container">
        <div className="uploadmusic--row">
          <div className="uploadmusic--upload--image">
            <div className="uploadmusic--column uploadmusic--upload--zone">
              <img src={previewCover} id="album--icon" alt="default_album" />
            </div>
            <label className="uploadmusic--custom-file-upload">
              <input
                type="file"
                name="cover"
                value=""
                accept="image/*"
                className="uploadmusic--gradient--btn uploadmusic--image--btn uploadmusic--hide--file"
                onChange={handleImageFileChange}
              />
              Choose Image{" "}
              <img
                src="../assets/upload_icon.png"
                id="upload--icon"
                alt="upload_icon"
              />
            </label>
          </div>

          {(() => {
            switch (pageName) {
              case "MusicDetails":
                return (
                  <MusicDetails
                    handleSubmit={handleSubmit}
                    handleTitle={handleTitle}
                    handleAlbumName={handleAlbumName}
                    handleEPName={handleEPName}
                    handleGenre={handleGenre}
                    handleSongFileChange={handleSongFileChange}
                    handleImageFileChange={handleImageFileChange}
                    handleReleaseType={handleReleaseType}
                    handleReleaseYear={handleReleaseYear}
                    handleFeaturedArtists={handleFeaturedArtists}
                    handleFormNavigation={handleFormNavigation}
                    pageName={pageName}
                    album={album}
                    ep={ep}
                    genre={genre}
                    title={title}
                    artist={
                      localStorage.getItem("artist") &&
                      JSON.parse(localStorage.getItem("artist")).artistName
                    }
                    featuredArtists={featuredArtists}
                    setFeaturedArtists={setFeaturedArtists}
                    imageFile={imageFile}
                    songFile={songFile}
                    releaseType={releaseType}
                    releaseYear={releaseYear}
                    setPageName={setPageName}
                    isUploading={isUploading}
                    artists={artistData}
                    setSongFile={setSongFile}
                    setToUploadSongs={setToUploadSongs}
                  />
                );
              case "AddSongs":
                return (
                  <AddSongs
                    handleSongFileChange={handleSongFileChange}
                    handleTitle={handleTitle}
                    handleReleaseType={handleReleaseType}
                    handleSubmit={handleSubmit}
                    handleFormNavigation={handleFormNavigation}
                    pageName={pageName}
                    setPageName={setPageName}
                    setSongFile={setSongFile}
                    setToUploadSongs={setToUploadSongs}
                    songsList={songsList}
                    toUploadSongs={toUploadSongs}
                    songFile={songFile}
                    title={title}
                    album={album}
                    ep={ep}
                    releaseType={releaseType}
                    songs={songs}
                    setSongs={setSongs}
                    isUploading={isUploading}
                    uploadProgress={uploadProgress}
                    submitted={submitted}
                    artists={artistData}
                  />
                );
              default:
                return null;
            }
          })()}

          <MusicSubmitted
            title={title}
            ep={ep}
            album={album}
            releaseType={releaseType}
            artist={
              localStorage.getItem("artist") &&
              JSON.parse(localStorage.getItem("artist")).artistName
            }
            featuredArtists={featuredArtists}
            releaseYear={releaseYear}
            genre={genre}
            previewCover={previewCover}
            submitted={submitted}
          />
        </div>
      </div>
      {/* {error && <p>{error}</p>} */}
    </section>
  );
}
