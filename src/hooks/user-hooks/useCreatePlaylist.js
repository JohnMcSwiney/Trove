import { useState } from "react";
import firebase from "../../pages/playlist/updatePlaylist/firebaseConfig";

export const useCreatePlaylist = () => {
  const [error, setError] = useState(null);
  const storage = firebase.storage();
  const [uploadProgress, setUploadProgress] = useState(0);
  let playlistCoverUrl = "nonee";

  const uploadPlaylist = async (playlistName, id, imageFile, songList) => {
    const storageRef = storage.ref();

    const uploadImageToFirebase = async () => {

      let fileRefName = imageFile?.name;
      const imageRef = storageRef.child(`images/${fileRefName}`);

      const imageUploadTask = imageRef.put(imageFile);

      console.log("imageFile: " + imageFile);

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
            reject(err);
          },
          async () => {
            const playlistCoverUrl = await imageRef.getDownloadURL();
            resolve(playlistCoverUrl);

            console.log("finished handlingimg");
          }
        );
      });
    };




    const createPlaylistObject = async (
      playlistCoverUrl,
      playlistName,
      id,
      songList
    ) => {
      const res = await fetch("/api/playlists/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          playlistName,
          id,
          playlistCoverUrl: playlistCoverUrl,
          songList,
        }),
      });

      const data = await res.json();

      console.log("Create Playlist Object: " + res);

      console.log("Playlist title: " + data.playlistName);

      if (!res.ok) {
        setError(data.error);
      }
    };

    playlistCoverUrl = await uploadImageToFirebase();
    await createPlaylistObject(playlistCoverUrl, playlistName, id, songList);
  };

  return { uploadPlaylist, error };
};
