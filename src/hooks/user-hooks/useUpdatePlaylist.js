import { useState } from "react";
import firebase from "../../pages/playlist/updatePlaylist/firebaseConfig";
import { useNavigate } from "react-router-dom";

export const useUpdatePlaylist = () => {
  const [error, setError] = useState(null);
  const storage = firebase.storage();
  const [uploadProgress, setUploadProgress] = useState(0);

  let playlistCoverUrl = "";
  const navigate = useNavigate();

  const updatePlaylist = async (
    id,
    playlistName,
    creatorid,
    imageFile,
    songList
  ) => {
    const storageRef = storage.ref();


    const uploadImageToFirebase = async () => {
      
      let fileRefName = imageFile?.name;

      const imageRef = storageRef.child(`images/${fileRefName}`);

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


    const updatePlaylistObject = async (id, playlistName, creatorid, playlistCoverUrl, songList) => {
      if (playlistCoverUrl) {
        const res = await fetch(`/api/playlists/${id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            playlistName,
            creatorid,
            playlistCoverUrl: playlistCoverUrl,
            songList: songList,
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
            creatorid,
            songList,
          }),
        });
        alert("should reach this and not do it again");

        const data = await res.json();

        console.log("Update Playlist Object: " + res);

        console.log("Playlist title: " + data.playlistName);

        if (!res.ok) {
          setError(data.error);
        }
      }
    };

    if (imageFile) {
      playlistCoverUrl = await uploadImageToFirebase();
    }

    await updatePlaylistObject(id, playlistName, creatorid, playlistCoverUrl, songList);
    
    if (!error) {
      navigate("/mytrove");
      // window.location.reload(false);
    }
  };

  return { updatePlaylist, error };
};
