import React from "react";
import firebase from "../../pages/account settings/firebaseConfig";

export const useUpdateInfo = () => {
  const [updateError, setUpdateError] = React.useState(null);
  const [isLoadingUpdate, setIsLoadingUpdate] = React.useState(false);
  const [infoMessage, setMessage] = React.useState("");
  const artistID = JSON.parse(localStorage.getItem("artist")).id;

  // profile photo
  const storage = firebase.storage();
  const [uploadProgress, setUploadProgress] = React.useState(0);

  let profilePhotoUrl = "";

  const updateInfo = async (artistName, dob, imageFile) => {
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
            const profilePhotoUrl = await imageRef.getDownloadURL();
            resolve(profilePhotoUrl);

            console.log("finished handlingimg");
          }
        );
      });
    };

    const checkImageExists = async (imageCounter) => {
      const imageRef = storageRef.child(`images/${imageCounter}`);

      const metadata = await imageRef.getMetadata().catch((err) => {
        if (err.code === "storage/object-not-found") {
          return false;
        } else {
          console.log(err);
          return true;
        }
      });
      return metadata !== false;
    };

    const updateArtistObject = async (artistName, dob, imageURL) => {
      setIsLoadingUpdate(true);
      setUpdateError(null);
      const response = await fetch(`/api/artists/updateinfo/${artistID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistName,
          dob,
          imageURL,
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        setUpdateError(json.error);
      }

      if (response.ok) {
        setMessage(json.success);
      }

      const artist = JSON.parse(localStorage.getItem("artist"));
      artist.artistName = artistName;
      artist.dob = dob;
      localStorage.setItem("artist", JSON.stringify(artist));
      setIsLoadingUpdate(false);
    };

    if (imageFile) {
      profilePhotoUrl = await uploadImageToFirebase();
    }

    await updateArtistObject(artistName, dob, profilePhotoUrl);
  };

  return { updateInfo, updateError, isLoadingUpdate, infoMessage };
};
