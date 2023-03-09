import { useState } from "react";
import { useArtistAuthContext } from "./useArtistAuthContext";
import firebase from "../pages/upload music/firebaseConfig";

export const useUploadSong = () => {
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const storage = firebase.storage();

  const uploadMusic = async (
    title,
    artist,
    album,
    genre,
    songFile,
    imageFile,
    releaseType,
    releaseYear,
    featuredArtists
  ) => {
    const storageRef = storage.ref();

    const songUrlList = [];

    const uploadSongToFirebase = async () => {
      setIsUploading(true);

      const songRef = storageRef.child(`songs/${songFile.name}`);

      const songUploadTask = songRef.put(songFile, {
        contentType: "audio/mp3",
      });

      console.log("songFile: " + songFile);

      console.log("songFile[0]: " + songFile[0]);

      console.log("songRef: " + songRef);

      return new Promise((resolve, reject) => {
        songUploadTask.on(
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
          (err) => {
            console.log(err);
            setIsUploading(false);
            reject(err);
          },
          async () => {
            const songUrl = await songRef.getDownloadURL();
            resolve(songUrl);
          }
        );
      });
    }

    const uploadManySongs = async () => {
      setIsUploading(true);

      Promise.all(
        songFile.map((file) => {

          const songRef = storageRef.child(`songs/${file.name}`);

          const songUploadTask = songRef.put(file, { contentType: "audio/mp3" });

          console.log("songFile: " + file);

          console.log("songFile[0]: " + file);

          console.log("songRef: " + songRef);

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
                resolve(songUrl)
              }
            );
          });
        })
      )
    }

    const uploadImageToFirebase = async () => {
      const imageRef = storageRef.child(`images/${imageFile.name}`);

      const imageUploadTask = imageRef.put(imageFile);

      console.log("imageFile: " + imageFile);

      console.log("imageFile[0]: " + imageFile[0]);

      console.log("imageRef: " + imageRef);

      return new Promise((resolve, reject) => {
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
          (err) => {
            console.log(err);
            setIsUploading(false);
            reject(err);
          },
          async () => {
            const imgUrl = await imageRef.getDownloadURL();
            resolve(imgUrl);
            console.log("finished handling song and img");
          }
        );
      });
    }

    const createSongObject = async (songUrl, imgUrl) => {
      // const endpoint = "http://localhost:6280/api/songs/"
      const res = await fetch("api/songs/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          title,
          artist,
          album,
          genre,
          //songUrl,
          //songUrl: releaseType === "single" ? songUrl : songUrl[0],
          imgUrl,
          releaseType,
          releaseYear,
          featuredArtists,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      }
    }

    const createAlbumObject = async (albumName, albumArt, artist, releaseType, releaseYear, featuredArtists, songUrl, imgUrl, songList) => {

      //const songList = [];
      console.log("before fetch");
      const albumResponse = await fetch("api/albums/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          albumName,
          albumArt,
          artist,
          featuredArtists,
          releaseType,
          releaseYear,
          songList
        }),
      });
      console.log("after fetch: " + albumResponse);

      const albumData = await albumResponse.json();
      console.log("Album Data: " + albumData);

      if (!albumResponse.ok) {
        setError(albumData.error);
      }

      // for (const song of songList) {

      //   await createSongObject(songUrl, imgUrl);
      // }

      //createSongObject(songUrl, imgUrl);


      // await Promise.all(
      //   songUrlList.map(async (songUrl, imgUrl) => {

      //     const res = await fetch("api/songs/", {
      //       method: "POST",
      //       headers: {
      //         Accept: "application/json",
      //         "Content-Type": "application/json",
      //         "Access-Control-Allow-Origin": "*",
      //       },
      //       body: JSON.stringify({
      //         title,
      //         artist,
      //         album,
      //         genre,
      //         songUrl,
      //         imgUrl,
      //         releaseType,
      //         releaseYear,
      //         featuredArtists,
      //       }),
      //     });
      //     console.log("after fetch");

      //     const data = await res.json();
          
      //     console.log("Song Data: " + data);

      //     songList.push(data.title);


      //     if (!res.ok) {
      //       setError(data.error);
      //     }
      //   })
      // )
    }

    switch (releaseType) {
      case "album":
        try {
          await uploadManySongs();

          const imgUrl = await uploadImageToFirebase();

          const data = await createAlbumObject(songUrlList, imgUrl);

          console.log("End Response Data: " + data);

          setIsUploading(false);
          setUploadProgress(0);
        } catch (err) {
          console.log(err);

          setIsUploading(false);
          setUploadProgress(0);
        }
        break;
      case "ep":

        break;
      case "single":

        try {
          const songUrl = await uploadSongToFirebase();

          const imgUrl = await uploadImageToFirebase();

          const data = await createSongObject(songUrl, imgUrl);

          console.log("End Response Data: " + data);

          setIsUploading(false);
          setUploadProgress(0);
        } catch (err) {
          console.log(err);

          setIsUploading(false);
          setUploadProgress(0);
        }
        //setIsUploading(false);
        break;
      default:
        break;
    }
  }
  return { uploadMusic, isUploading, error };
}

// const songRef = storageRef.child(`songs/${songUrl.name}`);
// const songUploadTask = songRef.put(songUrl, { contentType: "audio/mp3" });

// console.log("songUrl: " + songUrl);

// console.log("songUrl[0]: " + songUrl[0]);

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

//   async () => {
//     const songUrl = await songRef.getDownloadURL();

//     const imageRef = storageRef.child(`images/${imageFile.name}`);
//     const imageUploadTask = imageRef.put(imageFile);

//     console.log("imageFile: " + imageFile);

//     console.log("imageFile[0]: " + imageFile[0]);

//     console.log("imageRef: " + imageRef);

//     imageUploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         setUploadProgress(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );

//         console.log("Bytes Transferred: " + snapshot.bytesTransferred);

//         console.log("Total Bytes: " + snapshot.totalBytes);

//         console.log(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//       },
//       (error) => {
//         console.error(error);
//         setIsUploading(false);
//       },

//       async () => {
//         const imgUrl = await imageRef.getDownloadURL();

//         fetch("/api/songs", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             title,
//             album,
//             genre,
//             songUrl,
//             imgUrl,
//             releaseType,
//             releaseYear,
//             artist,
//           }),
//         })
//           //.then((res) => res.json())

//           .then((res) => {
//             console.log("End Response: " + res);
//             console.log("End Response Data: " + res.data);
//             setIsUploading(false);
//             setUploadProgress(0);
//           })
//           .catch((err) => {
//             console.error(err);
//             setIsUploading(false);
//             setUploadProgress(0);
//           });
//       }
//     );
//   }
// );
// }

//   if (releaseType === "single") {

// const songRef = storageRef.child(`songs/${songUrl.name}`);
// const songUploadTask = songRef.put(songUrl, { contentType: "audio/mp3" });

// console.log("songUrl: " + songUrl);

// console.log("songUrl[0]: " + songUrl[0]);

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

//   async () => {
//     const songUrl = await songRef.getDownloadURL();

//     const imageRef = storageRef.child(`images/${imageFile.name}`);
//     const imageUploadTask = imageRef.put(imageFile);

//     console.log("imageFile: " + imageFile);

//     console.log("imageFile[0]: " + imageFile[0]);

//     console.log("imageRef: " + imageRef);

//     imageUploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         setUploadProgress(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );

//         console.log("Bytes Transferred: " + snapshot.bytesTransferred);

//         console.log("Total Bytes: " + snapshot.totalBytes);

//         console.log(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//       },
//       (error) => {
//         console.error(error);
//         setIsUploading(false);
//       },

//       async () => {
//         const imgUrl = await imageRef.getDownloadURL();

//         fetch("/api/songs", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             title,
//             album,
//             genre,
//             songUrl,
//             imgUrl,
//             releaseType,
//             releaseYear,
//             artist,
//           }),
//         })
//           //.then((res) => res.json())

//           .then((res) => {
//             console.log("End Response: " + res);
//             console.log("End Response Data: " + res.data);
//             setIsUploading(false);
//             setUploadProgress(0);
//           })
//           .catch((err) => {
//             console.error(err);
//             setIsUploading(false);
//             setUploadProgress(0);
//           });
//       }
//     );
//   }
// );
// }

// else {

  // Promise.all(
  //   songUrl.map((file) => {

  //     const songRef = storageRef.child(`songs/${file.name}`);
  //     const songUploadTask = songRef.put(file, { contentType: "audio/mp3" });

  //     return new Promise((resolve, reject) => {

  //       songUploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           setUploadProgress(
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //           );
  //         },
  //         (err) => {
  //           console.log(err);
  //           reject(err);
  //         },
  //         async () => {
  //           const songUrl = await songRef.getDownloadURL();
  //           resolve(songUrl);
  //         }
  //       );

  //     });
  //   })
  // )
  //   .then((songUrls) => {

  //     const imageRef = storageRef.child(`images/${imageFile.name}`);
  //     const imageUploadTask = imageRef.put(imageFile);

  //     console.log("imageFile: " + imageFile);

  //     console.log("imageFile[0]: " + imageFile[0]);

  //     console.log("imageRef: " + imageRef);

  //     imageUploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         setUploadProgress(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );

  //         console.log("Bytes Transferred: " + snapshot.bytesTransferred);

  //         console.log("Total Bytes: " + snapshot.totalBytes);

  //         console.log(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //       },
  //       (error) => {
  //         console.error(error);
  //         setIsUploading(false);
  //       },

  //       async () => {
  //         const imgUrl = await imageRef.getDownloadURL();

  //         fetch("/api/albums", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             title,
  //             album,
  //             genre,
  //             songUrl: releaseType === "single" ? songUrls[0] : songUrls,
  //             imgUrl,
  //             releaseType,
  //             releaseYear,
  //             artist,
  //           }),
  //         })
  //           .then((res) => res.json())

  //           .then((res) => {
  //             console.log("End Response: " + res);
  //             console.log("End Response Data: " + res.data);
  //             setIsUploading(false);
  //             setUploadProgress(0);
  //           })
  //           .catch((err) => {
  //             console.error(err);
  //             setIsUploading(false);
  //             setUploadProgress(0);
  //           });
  //       }
  //     );
  //   });

//   Promise.all(
//     songUrl.map((file) => {

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

// const songRef = storageRef.child(`songs/${songUrl[0].name}`);
// const songUploadTask = songRef.put(songUrl, { contentType: "audio/mp3" });

// console.log("songUrl: " + songUrl);

// console.log("songUrl[0]: " + songUrl[0]);

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
