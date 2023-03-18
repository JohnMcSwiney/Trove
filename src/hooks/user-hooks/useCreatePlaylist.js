import { useState } from "react";
import firebase from "../../pages/create playlist/firebaseConfig";

export const useCreatePlaylist = () => {
  const [error, setError] = useState(null);
  const storage = firebase.storage();
  const [uploadProgress, setUploadProgress] = useState(0);
  let playlistCoverUrl ="nonee";

  const uploadPlaylist = async (
    playlistName,
    id, 
    imageFile
  ) => {

    const storageRef = storage.ref();

    const uploadImageToFirebase = async () => {

      let imageCounter = 0;

      while (await checkImageExists(imageCounter)) {
        imageCounter++;
      }

      const imageRef = storageRef.child(`images/${imageCounter}`);

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

    const checkImageExists = async (imageCounter) => {

      const imageRef = storageRef.child(`images/${imageCounter}`);

      const metadata = await imageRef.getMetadata()
      .catch(err => {

        if (err.code === "storage/object-not-found") {
          return false;
        }
        else {
          console.log(err);
          return true;
        }
      });
      return metadata !== false
    }

    const createPlaylistObject = async (playlistCoverUrl) => {
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
          playlistCoverUrl: playlistCoverUrl
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
    await createPlaylistObject(playlistCoverUrl);
  };

  return { uploadPlaylist, error };
};