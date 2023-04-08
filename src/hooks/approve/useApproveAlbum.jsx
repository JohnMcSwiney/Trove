import { useState } from "react";

export const useApproveAlbum = () => {
  const [approveAlbumError, setApproveAlbumError] = useState(null);
  const [approveAlbumIsLoading, setApproveAlbumIsLoading] = useState(false);

  const approveAlbum = async (albumID) => {
    setApproveAlbumIsLoading(true);
    setApproveAlbumError(null);
    const response = await fetch(`/api/albums/approved/${albumID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      setApproveAlbumError(json.error);
    }

    setApproveAlbumIsLoading(false);
  };

  return { approveAlbum, approveAlbumError, setApproveAlbumIsLoading };
};
