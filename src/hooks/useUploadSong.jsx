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

    const uploadSongToFirebase = async (songFile) => {
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
            console.log("single song url: " + songUrl);
            resolve(songUrl);
          }
        );
      }).then((songUrl) => {
        console.log("return songurl: " + songUrl);
        return songUrl;
      })
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

    const createSongObject = async (title, songUrl, imgUrl) => {
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
          songUrl: songUrl,
          imgUrl: imgUrl,
          releaseType,
          releaseYear,
          featuredArtists,
        }),
      });

      const data = await res.json();

      console.log("Create Song Object: " + res.title);

      console.log("Song title: ");

      if (!res.ok) {
        setError(data.error);
      }
    }

    const createAlbumObject = async (imgUrl) => {

      let songUrl = "";

      console.log("before fetch");
      const res = await fetch("api/albums/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          albumName: album,
          albumArt: imgUrl,
          artist,
          featuredArtists,
          releaseType,
          releaseYear,
          songList: []
        }),
      });

      console.log("after fetch: " + res);

      const data = await res.json();
      console.log("Album Data: " + data);

      if (!data.ok) {
        setError(data.error);
      }

      for (const file of songFile) {

        songUrl = await uploadSongToFirebase(file);

        console.log("for loop song url: " + songUrl);

        console.log("the song title: " + title);

        const imgUrl = process.env.DEFAULT_COVER;
    
        await createSongObject(title, songUrl, imgUrl);

      }

      console.log("songs created!");
    }

    switch (releaseType) {
      case "album":
        try {

          let imgUrl;

          if (!imageFile || imageFile == null) {

            console.log("no image selected");

            imgUrl = process.env.DEFAULT_COVER;
      
            await createAlbumObject(imgUrl);
          }

          else {

            imgUrl = await uploadImageToFirebase();
          }


          const data = await createAlbumObject(imgUrl);

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

          const songUrl = await uploadSongToFirebase(songFile);

          let imgUrl;

          if (!imageFile || imageFile == null) {

            console.log("no image selected");

            imgUrl = process.env.DEFAULT_COVER;
      
            await createSongObject(title, songUrl, imgUrl);
          }

          else {

            imgUrl = await uploadImageToFirebase();
          }


          const data = await createSongObject(title, songUrl, imgUrl);

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
      // return songUrlList;

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
