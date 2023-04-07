import { useState } from "react";

export const useEditSong = () => {
  const [editIsLoading, setEditIsLoading] = useState(false);
  const [editerror, setEditError] = useState(null);
  const [message, setMessage] = useState("");

  const editSong = async (
    id,
    title,
    artistID,
    featureArtists,
    album,
    ep,
    songYear,
    imgUrl,
    genre
  ) => {
    setEditError(null);
    setEditIsLoading(true);
    const response = await fetch(`/api/songs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        artistID,
        featureArtists,
        album,
        ep,
        songYear,
        imgUrl,
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
  return { editSong, message, editerror, editIsLoading };
};
