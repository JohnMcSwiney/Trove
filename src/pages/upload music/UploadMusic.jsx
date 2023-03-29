import React, { useEffect, useState } from "react";
// import MusicBar from "../ArtistProfile/musicBar/MusicBar";
// import SideBar from "../ArtistProfile/Sidebar/Sidebar"
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
//  ARTISTS MUSIC SUBMISSION PAGE
export default function UploadMusic(props) {
  const storage = firebase.storage();

  // State for large vs small header
  const [small, setSmall] = useState(false);
  // following states
  const [follow, setFollow] = React.useState(false);
  const [followers, setFollowers] = React.useState(200);
  // menu
  const [showMenu, setShowMenu] = React.useState(false);

  const windowBreakpoint = 480;

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 200)
      );
    }
  }, []);

  const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [artistList, setArtistList] = React.useState([]);

    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      if (width > windowBreakpoint) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }

      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // Return the width so we can use it in our components
    return { width };
  };

  const { width } = useViewport();

  let menu;
  if (showMenu) {
    //  menu = <SideBar />
  }

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

    // if (releaseType === "single") {
    //   setTitle(e.target.value);

    // } else {

    // }
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
        setSongFile(e.target.files[0]);
      default:
        break;
    }
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setPreviewCover(URL.createObjectURL(e.target.files[0]));
  };

  const handleReleaseType = (e) => {
    setReleaseType(e.target.value);
  };

  const handleReleaseYear = (e) => {
    setReleaseYear(e.target.value);
  };

  const { artistLoggedIn } = useArtistAuthContext();
  const artistID = localStorage.getItem("artist")
    ? JSON.parse(localStorage.getItem("artist")).id
    : null;

  const handleFeaturedArtists = (e) => {
    const inputtedArtists = e.target.value;

    const artistArray = inputtedArtists
      .split("/[s,]+/")
      .filter((artist) => artist.length > 0);

    setFeaturedArtists(artistArray);
  };

  // When music is submitted
  const { uploadMusic, isUploading, error, message } = useUploadSong();
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
      console.log(songFile.name);
    }
  }, [songFile]);

  console.log("toUploadSongs value: " + toUploadSongs);

  // To change page name from music details to add songs
  const [pageName, setPageName] = React.useState("MusicDetails");
  function handleFormNavigation(pageName) {
    setPageName(pageName);
  }

  React.useEffect(() => {
    console.log(pageName);
  }, [pageName]);

  return (
    <section>
      {menu}

      {/* HEADER */}
      {/* Form starts */}
      <div className="uploadmusic--upload--form container">
        {/* <form className="upload--form"
                onSubmit={handleSubmit}> */}

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
                    artist={artist}
                    featuredArtists={featuredArtists}
                    imageFile={imageFile}
                    songFile={songFile}
                    releaseType={releaseType}
                    releaseYear={releaseYear}
                    setPageName={setPageName}
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
                  />
                );
              // case 'ReviewSongs':
              //   return <ReviewSongs
              //     handleSongFileChange={handleSongFileChange}
              //     handleTitle={handleTitle}
              //     handleSubmit={handleSubmit}
              //     handleFormNavigation={handleFormNavigation}
              //     pageName ={pageName}
              //     setPageName={setPageName}/>
              default:
                return null;
            }
          })()}
        </div>
        {/* </form> */}
      </div>
          {error && (
            <p>{error}</p>
          )}
           {message && (
            <p>{message}</p>
          )}
    </section>
  );
}
