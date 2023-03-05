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
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
  // const [title, setTitle] = useState([]);
  const [title, setTitle] = useState();
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [songFile, setSongFile] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [releaseType, setReleaseType] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [artist, setArtist] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

    console.log("relerwerwsdfdsfds: " + releaseType);

    if (releaseType === "single") {

      setSongFile(e.target.files[0]);
    }
    else {

      setSongFile(Array.from(e.target.files));
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

  const handleArtist = (e) => {
    setArtist(e.target.value);
  };

  // When music is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);

    const storageRef = storage.ref();

    if (releaseType === "single") {

      const songRef = storageRef.child(`songs/${songFile.name}`);
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

                console.log("before song post");

                fetch("/api/songs", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    title,
                    genre,
                    songUrl,
                    imgUrl,
                    releaseType,
                    releaseYear,
                    artist,
                  })
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
      }

    else {

      Promise.all(
        songFile.map((file) => {

          const songRef = storageRef.child(`songs/${file.name}`);
          const songUploadTask = songRef.put(file, { contentType: "audio/mp3" });

          return new Promise((resolve, reject) => {

            songUploadTask.on(
              "state_changed",
              (snapshot) => {
                setUploadProgress(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
              },
              (err) => {
                console.log(err);
                reject(err);
              },
              async () => {
                const songUrl = await songRef.getDownloadURL();
                resolve(songUrl);
              }
            );

          });
        })
      )
        .then((songUrls) => {

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

              fetch("/api/albums", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title,
                  album,
                  genre,
                  songUrl: releaseType === "single" ? songUrls[0] : songUrls,
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
        });
    }
  }






//   Promise.all(
//     songFile.map((file) => {

//       const songRef = storageRef.child(`songs/${file.name}`);
//       const songUploadTask = songRef.put(file, { contentType: "audio/mp3" });

//       return new Promise((resolve, reject) => {

//         songUploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             setUploadProgress(
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             );
//           },
//           (err) => {
//             console.log(err);
//             reject(err);
//           },
//           async () => {
//             const songUrl = await songRef.getDownloadURL();
//             resolve(songUrl);
//           }
//         );

//       });
//     })
//   )
//     .then((songUrls) => {

//       const imageRef = storageRef.child(`images/${imageFile.name}`);
//       const imageUploadTask = imageRef.put(imageFile);

//       console.log("imageFile: " + imageFile);

//       console.log("imageFile[0]: " + imageFile[0]);

//       console.log("imageRef: " + imageRef);

//       imageUploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           setUploadProgress(
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//           );

//           console.log("Bytes Transferred: " + snapshot.bytesTransferred);

//           console.log("Total Bytes: " + snapshot.totalBytes);

//           console.log(
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//           );
//         },
//         (error) => {
//           console.error(error);
//           setIsUploading(false);
//         },

//         async () => {
//           const imgUrl = await imageRef.getDownloadURL();

//           fetch("/api/songs", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               title,
//               album,
//               genre,
//               songUrl: releaseType === "single" ? songUrls[0] : songUrls,
//               imgUrl,
//               releaseType,
//               releaseYear,
//               artist,
//             }),
//           })
//             .then((res) => res.json())

//             .then((res) => {
//               console.log("End Response: " + res);
//               console.log("End Response Data: " + res.data);
//               setIsUploading(false);
//               setUploadProgress(0);
//             })
//             .catch((err) => {
//               console.error(err);
//               setIsUploading(false);
//               setUploadProgress(0);
//             });
//         }
//       );
//     });
// }

  // const songRef = storageRef.child(`songs/${songFile[0].name}`);
  // const songUploadTask = songRef.put(songFile, { contentType: "audio/mp3" });

  // console.log("songFile: " + songFile);

  // console.log("songFile[0]: " + songFile[0]);

  // console.log("songRef: " + songRef);

  // songUploadTask.on(
  //   "state_changed",
  //   (snapshot) => {
  //     setUploadProgress(
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     );

  //     console.log("Bytes Transferred: " + snapshot.bytesTransferred);

  //     console.log("Total Bytes: " + snapshot.totalBytes);

  //     console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //   },
  //   (error) => {
  //     console.error(error);
  //     setIsUploading(false);
  //   },

  //     async () => {
  //       const songUrl = await songRef.getDownloadURL();

  //       const imageRef = storageRef.child(`images/${imageFile.name}`);
  //       const imageUploadTask = imageRef.put(imageFile);

  //       console.log("imageFile: " + imageFile);

  //       console.log("imageFile[0]: " + imageFile[0]);

  //       console.log("imageRef: " + imageRef);

  //       imageUploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           setUploadProgress(
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //           );

  //           console.log("Bytes Transferred: " + snapshot.bytesTransferred);

  //           console.log("Total Bytes: " + snapshot.totalBytes);

  //           console.log(
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //           );
  //         },
  //         (error) => {
  //           console.error(error);
  //           setIsUploading(false);
  //         },

  //         async () => {
  //           const imgUrl = await imageRef.getDownloadURL();

  //           fetch("/api/songs", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               title,
  //               album,
  //               genre,
  //               songUrl: releaseType === "single" ? songUrl[0] : songUrl,
  //               imgUrl,
  //               releaseType,
  //               releaseYear,
  //               artist,
  //             }),
  //           })
  //             .then((res) => res.json())

  //             .then((res) => {
  //               console.log("End Response: " + res);
  //               console.log("End Response Data: " + res.data);
  //               setIsUploading(false);
  //               setUploadProgress(0);
  //             })
  //             .catch((err) => {
  //               console.error(err);
  //               setIsUploading(false);
  //               setUploadProgress(0);
  //             });
  //         }
  //       );
  //     }
  //   );
  // };

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
                    // handleHighlightStart={handleHighlightStart}
                    // handleHighlightStop={handleHighlightStop}
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
                    // highlightStart={highlightStart}
                    // highlightStop={highlightStop}
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
