import { useState, useContext } from "react";
import { MusicContext } from "../../contexts/MusicContext";
import { useAuthContext } from "./useAuthContext";
export const useLikeSong = () => {
  const [likeError, setLikeError] = useState(null);
  const [likeIsLoading, setLikeIsLoading] = useState(false);

  const { currentSong } = useContext(MusicContext);
  const { user } = useAuthContext();
  const userID = user._id;
  const like = async () => {
    setLikeIsLoading(true);
    setLikeError(null);
    const response = await fetch(`/api/songs/liked/${currentSong._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID }),
    });
    const json = await response.json();

    if (!response.ok) {
      setLikeError(json.err);
    }

    setLikeIsLoading(false);
  };

  return { like, likeError, likeIsLoading };
};
