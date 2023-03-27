import { useState } from "react";

export const useEditArtist = () => {
  const [editIsLoading, setEditIsLoading] = useState(false);
  const [editerror, setEditError] = useState(null);
  const [message, setMessage] = useState("");

  const editArtist = async (
    id,
    avatar,
    artistName,
    dob,
    email,
    password,
    gender
  ) => {
    setEditError(null);
    setEditIsLoading(true);
    const response = await fetch(`/api/artists/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        avatar,
        artistName,
        dob,
        email,
        password,
        gender,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      setEditError(json.error);
    }

    if (response.ok) {
      setMessage(json.message);
    }
    setEditIsLoading(false);
  };
  return { editArtist, message, editerror, editIsLoading };
};
