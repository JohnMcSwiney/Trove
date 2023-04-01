import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import firebase from "../../pages/my account/firebaseConfig";

export const useUpdateAccount = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  // profile photo
  const storage = firebase.storage();
  const [uploadProgress, setUploadProgress] = useState(0);

  let profilePhotoUrl ="";
  
  const updateAccount = async (
    displayName, 
    dob,
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
            const profilePhotoUrl = await imageRef.getDownloadURL();
            resolve(profilePhotoUrl);

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


  const updateUserObject = async (displayName, dob, imageURL) => {
    setIsLoading(true);
    setError(null);

    const userId = JSON.parse(localStorage.getItem("user")).id;

    const response = await fetch(`/api/users/ua/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify
      ({ 
        displayName, 
        dob, 
        imageURL
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    setIsLoading(false);
    setUpdateMessage(json.success);
    const user = JSON.parse(localStorage.getItem("user"));
    user.displayName = displayName;
    user.dob = dob;
    localStorage.setItem("user", JSON.stringify(user));
  };

  if(imageFile) {
    profilePhotoUrl = await uploadImageToFirebase();
  }
  
  await updateUserObject(displayName, dob, profilePhotoUrl);

  };
  return { updateAccount, error, isLoading, updateMessage };

};
