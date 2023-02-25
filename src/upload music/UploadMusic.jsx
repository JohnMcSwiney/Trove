import React, { useEffect, useState } from "react";
// import MusicBar from "../ArtistProfile/musicBar/MusicBar";
// import SideBar from "../ArtistProfile/Sidebar/Sidebar"
import WavesBG from "../Vector.svg";
import MusicDetails from "./MusicDetails";
import AddSongs from "./AddSongs";
import "./UploadMusic.css";
import ReviewSongs from "./ReviewSongs";
import SongInfo from "./SongInfo";
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//  ARTISTS MUSIC SUBMISSION PAGE
export default function UploadMusic(props) {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAMBOXMTHSEKxID-wKEex3nmNoRqmm_wD4",
    authDomain: "helical-analyst-376421.firebaseapp.com",
    projectId: "helical-analyst-376421",
    storageBucket: "helical-analyst-376421.appspot.com",
    messagingSenderId: "376243716539",
    appId: "1:376243716539:web:224230609e73c04d8b049e",
    measurementId: "G-47B2D6EVKF",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

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

  //  Submission Value States
  const [title, setTitle] = useState([]);
  const [album, setAlbum] = useState("");
  const [highlightStart, setHighlightStart] = useState();
  const [highlightStop, setHighlightStop] = useState();
  const [genre, setGenre] = useState("");
  const [songFile, setSongFile] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [releaseType, setReleaseType] = useState("");
  const [releaseYear, setReleaseYear] = useState();
  const [artist, setArtist] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle State Changes
  const handleTitle = (e) => {
    const { value, name } = e.target;
    setTitle({ ...title, [name]: value });
    console.log(title);
    // setTitle(e.target.value);
  };

  const handleAlbumName = (e) => {
    setAlbum(e.target.value);
  };

  const handleHighlightStart = (e) => {
    setHighlightStart(e.target.value);
  };

  const handleHighlightStop = (e) => {
    setHighlightStop(e.target.value);
  };

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleSongFileChange = (e) => {
    setSongFile((prevSongFile) => {
      return [...prevSongFile, e.target.files[0]];
    });
    // console.log(songFile[0].name);
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

  const handleArtist = (e) => {
    setArtist(e.target.value);
  };

  // When music is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);

    const storageRef = storage.ref();
    const songRef = storageRef.child(`songs/${songFile[0].name}`);
    const songUploadTask = songRef.put(songFile, { contentType: "audio/mp3" });

    console.log("songFile: " + songFile);

    console.log("songFile[0]: " + songFile[0]);

    console.log("songRef: " + songRef);

    songUploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploadProgress(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        console.log("Bytes Transferred: " + snapshot.bytesTransferred);

        console.log("Total Bytes: " + snapshot.totalBytes);

        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.error(error);
        setIsUploading(false);
      },

      async () => {
        const songUrl = await songRef.getDownloadURL();

        const imageRef = storageRef.child(`images/${imageFile.name}`);
        const imageUploadTask = imageRef.put(imageFile);

        console.log("imageFile: " + imageFile);

        console.log("imageFile[0]: " + imageFile[0]);

        console.log("imageRef: " + imageRef);

        imageUploadTask.on(
          "state_changed",
          (snapshot) => {
            setUploadProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            console.log("Bytes Transferred: " + snapshot.bytesTransferred);

            console.log("Total Bytes: " + snapshot.totalBytes);

            console.log(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            console.error(error);
            setIsUploading(false);
          },

          async () => {
            const imgUrl = await imageRef.getDownloadURL();

            fetch("/api/songs", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title,
                album,
                highlightStart,
                highlightStop,
                genre,
                songUrl,
                imgUrl,
                releaseType,
                releaseYear,
                artist,
              }),
            })
              .then((res) => res.json())

              .then((res) => {
                console.log("End Response: " + res);
                console.log("End Response Data: " + res.data);
                setIsUploading(false);
                setUploadProgress(0);
              })
              .catch((err) => {
                console.error(err);
                setIsUploading(false);
                setUploadProgress(0);
              });
          }
        );
      }
    );
  };

  // Initial Album Cover Display
  const default_album = "../../assets/default_upload.png";
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
      <div className="uploadmusic--upload--form">
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
                src="../../assets/upload_icon.png"
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
                    handleHighlightStart={handleHighlightStart}
                    handleHighlightStop={handleHighlightStop}
                    handleGenre={handleGenre}
                    handleSongFileChange={handleSongFileChange}
                    handleImageFileChange={handleImageFileChange}
                    handleReleaseType={handleReleaseType}
                    handleReleaseYear={handleReleaseYear}
                    handleArtist={handleArtist}
                    handleFormNavigation={handleFormNavigation}
                    pageName={pageName}
                    album={album}
                    genre={genre}
                    title={title}
                    imageFile={imageFile}
                    songFile={songFile}
                    highlightStart={highlightStart}
                    highlightStop={highlightStop}
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
                    handleSubmit={handleSubmit}
                    handleFormNavigation={handleFormNavigation}
                    pageName={pageName}
                    setPageName={setPageName}
                    songsList={songsList}
                    toUploadSongs={toUploadSongs}
                    songFile={songFile}
                    title={title}
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
