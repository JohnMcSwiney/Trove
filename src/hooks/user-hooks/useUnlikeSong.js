import { useState, useContext } from "react";
import { MusicContext } from "../../contexts/MusicContext";
import { useAuthContext } from "./useAuthContext";
export const useUnlikeSong = () => {
  const [unlikeError, setUnlikeError] = useState(null);
  const [unlikeIsLoading, setunLikeIsLoading] = useState(false);

  const { currentSong } = useContext(MusicContext);
  const { user } = useAuthContext();
  const userID = user.id;
  const unlike = async () => {
    setunLikeIsLoading(true);
    setUnlikeError(null);
    const response = await fetch(`/api/songs/removelike/${currentSong._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID }),
    });
    const json = await response.json();

    if (!response.ok) {
      setUnlikeError(json.err);
    }

    setunLikeIsLoading(false);
  };

  return { unlike, unlikeError, unlikeIsLoading };
};
