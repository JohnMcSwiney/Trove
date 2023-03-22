
import { useState} from 'react';


export const useFetchSongs = async () => {

  const [songs, setSongs] = useState([]);

  const songResponse = await fetch("/api/songs/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const songJson = await songResponse.json();
  if (songResponse.ok) {
    setSongs(songJson);

    for (let i = 0; i < songs.length; i++) {
      console.log("song title: " + songs[i].title);

    }
  }
}