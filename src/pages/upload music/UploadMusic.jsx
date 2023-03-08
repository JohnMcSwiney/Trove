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

  const [title, setTitle] = useState();
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [songFile, setSongFile] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [releaseType, setReleaseType] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [artist, setArtist] = useState("");
  const [featuredArtists, setFeaturedArtists] = useState("");

  // Handle State Changes
  const handleTitle = (e) => {
    // const { value, name } = e.target;
    // setTitle({ ...title, [name]: value });
    // console.log(title);
    setTitle(e.target.value);
  };

  const handleAlbumName = (e) => {
    setAlbum(e.target.value);
  };

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleSongFileChange = (e) => {
    setSongFile(e.target.files[0]);

    //console.log("relerwerwsdfdsfds: " + releaseType);

    // if (releaseType === "single") {

    //   setSongFile(e.target.files[0]);
    // }
    // else {

    //   setSongFile(Array.from(e.target.files));
    // }
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

  const artistID = localStorage.getItem("artistID");
  const getArtistAPI = React.useEffect(() => {
    const fetchArtist = async () => {
      const response = await fetch(`/api/artists/${artistID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.ok) {
        setArtist(json.artistName);
        console.log("JSON: " + json.artistName);
        // console.log("Artist: " + artist);
        // console.log("Artist name: " + artist.artistName);
      }
    };
    fetchArtist();
  }, []);
  const handleArtist = () => {
    setArtist(artist.artistName);
  };

  const handleFeaturedArtists = (e) => {
    setFeaturedArtists(e.target.value);
  };

  // When music is submitted
  const { uploadMusic, isUploading, error } = useUploadSong();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadMusic(
        title,
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
                    handleGenre={handleGenre}
                    handleSongFileChange={handleSongFileChange}
                    handleImageFileChange={handleImageFileChange}
                    handleReleaseType={handleReleaseType}
                    handleReleaseYear={handleReleaseYear}
                    handleFeaturedArtists={handleFeaturedArtists}
                    handleFormNavigation={handleFormNavigation}
                    handleArtist={handleArtist}
                    getArtistAPI={getArtistAPI}
                    pageName={pageName}
                    album={album}
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
                    releaseType={releaseType}
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

      {/* <footer><MusicBar /></footer> */}
    </section>
  );
}
