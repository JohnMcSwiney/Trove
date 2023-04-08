import { useState } from "react";

export const useRejectAlbum = () => {
  const [rejectAlbumError, setRejectAlbumError] = useState(null);
  const [rejectAlbumIsLoading, setRejectAlbumIsLoading] = useState(false);
  const [rejectAlbumStatus, setRejectAlbumStatus] = useState("");

  const rejectAlbum = async (albumID, message) => {
    setRejectAlbumError(null);
    setRejectAlbumIsLoading(true);
    const response = await fetch(`/api/albums/rejected/${albumID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const json = await response.json();

    if (!response.ok) {
      setRejectAlbumError(json.error);
    }

    if (response.ok) {
      setRejectAlbumStatus("success");
      setRejectAlbumIsLoading(false);
    }
  };

  return {
    rejectAlbum,
    rejectAlbumError,
    rejectAlbumIsLoading,
    rejectAlbumStatus,
  };
};
