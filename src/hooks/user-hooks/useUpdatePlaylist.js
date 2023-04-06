import { useState } from "react";
import firebase from "../../pages/playlist/updatePlaylist/firebaseConfig";

export const useUpdatePlaylist = () => {
  const [error, setError] = useState(null);
  const storage = firebase.storage();
  const [uploadProgress, setUploadProgress] = useState(0);
  let playlistCoverUrl ="";

  const updatePlaylist = async (
    id,
    playlistName,
    creatorid, 
    imageFile, 
    songList
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

    const updatePlaylistObject = async (playlistCoverUrl) => {
      if(playlistCoverUrl) {
        const res = await fetch(`/api/playlists/${id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            playlistName,
            // id: creatorid, 
            playlistCoverUrl: playlistCoverUrl,
            songList
          }),
        });

        const data = await res.json();

        console.log("Update Playlist Object: " + res);
  
        console.log("Playlist title: " + data.playlistName);
  
        if (!res.ok) {
          setError(data.error);
        }
      } else {
        const res = await fetch(`/api/playlists/${id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            playlistName,
            // id: creatorid, 
            songList
          }),
        });

        const data = await res.json();

        console.log("Update Playlist Object: " + res);
  
        console.log("Playlist title: " + data.playlistName);
  
        if (!res.ok) {
          setError(data.error);
        }
      }

    };

    if(imageFile) {
      playlistCoverUrl = await uploadImageToFirebase();
    }
    await updatePlaylistObject(playlistCoverUrl);
  };

  return { updatePlaylist, error };
};