import React, { useState } from 'react';
import { Storage } from '@google-cloud/storage';


const UploadSong = () => {

  const storage = new Storage({
    //the project id
    projectId: '',

    // path to keyfile.json
    keyFilename: ''
  });

  //const bucket = storage.bucket('trv-test');

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSongFileChange = (e) => {
    setSongFile(e.target.files[0]);
  };

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);

    //const storage = new Storage();

    storage
      .bucket('trv_test')
      .upload(songFile, {
        gzip: true,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
        destination: `songs/${songFile.name}`,
        onUploadProgress: (progress) => {
          setUploadProgress(progress.bytesTransfered / progress.totalBytes * 100);
        }
      })
      .then(async ([songFile]) => {
        const songUrl = `https://storage.googleapis.com/${songFile.bucket.name}/${songFile.name}`;

        storage
          .bucket('trv_test')
          .upload(imageFile, {
            gzip: true,
            metadata: {
              cacheControl: 'public, max-age=31536000',
            },
            destination: `images/${imageFile.name}`,
            onUploadProgress: (progress) => {
              setUploadProgress(progress.bytesTransfered / progress.totalBytes * 100);
            }
          })
          .then(async ([imageFile]) => {

            const imgUrl = `https://storage.googleapis.com/${imageFile.bucket.name}/${imageFile.name}`;

            fetch('/api/songs', {

              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title,
                genre,
                artist,
                album,
                songUrl,
                imgUrl,
              })
            })

              .then(res => res.json())

              .then(data => {
                console.log(data);
                setIsUploading(false);
                setUploadProgress(0);
              })
              .catch((err) => {
                console.error(err);
                setIsUploading(false);
                setUploadProgress(0);
              });
          });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Song title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        type="text"
        placeholder="Album"
        value={artist}
        onChange={(e) => setAlbum(e.target.value)}
      />
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudioFile(e.target.files[0])}
      //onChange={handleSongFileChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      //onChange={handleImageFileChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
}