import { useState } from "react";

export const useEditEP = () => {
  const [editIsLoading, setEditIsLoading] = useState(false);
  const [editerror, setEditError] = useState(null);
  const [message, setMessage] = useState("");

  const editEP = async (
    id,
    epArt,
    epName,
    artist,
    releaseYear,
    songList,
    genre
  ) => {
    setEditError(null);
    setEditIsLoading(true);

    const response = await fetch(`/api/eps/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        epArt,
        epName,
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
  return { editEP, message, editerror, editIsLoading };
};
