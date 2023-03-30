import { useState } from "react";
import { useParams } from "react-router-dom";

export const useFollowArtist = () => {
  const [followError, setFollowError] = useState(null);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const follow = async (id) => {
    setFollowError(null);
    setIsFollowLoading(true);

    const response = await fetch(`api/artists/follow/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setFollowError(json.error);
    }

    setIsFollowLoading(false);
  };

  return { follow, followError, isFollowLoading };
};
