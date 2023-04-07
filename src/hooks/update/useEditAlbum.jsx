import { useState } from "react";

export const useEditAlbum = () => {
  const [editIsLoading, setEditIsLoading] = useState(false);
  const [editerror, setEditError] = useState(null);
  const [message, setMessage] = useState("");

  const editAlbum = async (
    id,
    albumArt,
    albumName,
    artist,
    releaseYear,
    songList,
    genre
  ) => {
    setEditError(null);
    setEditIsLoading(true);

    const response = await fetch(`/api/albums/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        albumArt,
        albumName,
        artist,
        releaseYear,
        songList,
        genre,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      setEditError(json.error);
    }
    if (response.ok) {
      setMessage(json.success);
    }
    setEditIsLoading(false);
  };
  return { editAlbum, message, editerror, editIsLoading };
};
