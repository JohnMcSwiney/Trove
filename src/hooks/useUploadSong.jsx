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
    ep,
    album,
    genre,
    songFile,
    imageFile,
    releaseType,
    releaseYear,
    featuredArtists,
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
      });
    };

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

      console.log("Create Song Object: " + res);

      console.log("Song title: " + data.title);

      if (!res.ok) {
        setError(data.error);
      }
    };

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
          songList: [],
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

        await createSongObject(title, songUrl, imgUrl);
      }

      console.log("songs created!");
    };

    const createEPObject = async (imgUrl) => {
      let songUrl = "";

      console.log("before fetch");
      const res = await fetch("api/eps/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          epName: ep,
          epArt: imgUrl,
          artist,
          featuredArtists,
          releaseType,
          releaseYear,
          songList: [],
        }),
      });

      console.log("after fetch: " + res);

      const data = await res.json();
      console.log("EP Data: " + data);

      if (!data.ok) {
        setError(data.error);
      }

      for (const file of songFile) {
        songUrl = await uploadSongToFirebase(file);

        console.log("for loop song url: " + songUrl);

        await createSongObject(title, songUrl, imgUrl);
      }

      console.log("songs created!");
    };


    switch (releaseType) {
      case "album":
        try {

          let imgUrl = "";

          let data = "";

          if (!imageFile || imageFile == null) {

            console.log("no image selected");

            imgUrl = process.env.DEFAULT_COVER;

            data = await createAlbumObject(imgUrl);
          }

          else {

            imgUrl = await uploadImageToFirebase();

            data = await createAlbumObject(imgUrl);

          }
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

        try {
          //const imgUrl = await uploadImageToFirebase();

          let imgUrl = "";

          let data = "";

          if (!imageFile || imageFile == null) {

            console.log("no image selected");

            imgUrl = process.env.DEFAULT_COVER;

            data = await createEPObject(imgUrl);
          }

          else {

            imgUrl = await uploadImageToFirebase();

            data = await createEPObject(imgUrl);

          }
          console.log("End Response Data: " + data);

          setIsUploading(false);
          setUploadProgress(0);
        } catch (err) {
          console.log(err);

          setIsUploading(false);
          setUploadProgress(0);
        }
        break;
      case "single":
        try {

          let imgUrl = "";

          let data = "";

          const songUrl = await uploadSongToFirebase(songFile);

          if (!imageFile || imageFile == null) {

            console.log("no image selected");

            imgUrl = process.env.DEFAULT_COVER;

            data = await createSongObject(title, songUrl, imgUrl);
          }

          else {

            imgUrl = await uploadImageToFirebase();

            data = await createSongObject(title, songUrl, imgUrl);

          }
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
  };
  return { uploadMusic, isUploading, error };
};