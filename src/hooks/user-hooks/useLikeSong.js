import { useState, useContext } from "react";
import { MusicContext } from "../../contexts/MusicContext";
export const useLikeSong = () => {
  const [likeError, setLikeError] = useState(null);
  const [likeIsLoading, setLikeIsLoading] = useState(false);

  const { currentSong } = useContext(MusicContext);
  const user = localStorage.getItem("user");
  const userID = user ? JSON.parse(user).id : null;
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
      setLikeError(json.error);
    }

    if (response.ok) {
      const user = localStorage.getItem("user");
      const likedSongs = user ? JSON.parse(user).likedSongs || [] : [];
      if (!likedSongs.includes(currentSong._id)) {
        likedSongs.push(currentSong._id);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...JSON.parse(user), likedSongs })
        );
      }
    }

    setLikeIsLoading(false);
  };

  return { like, likeError, likeIsLoading };
};
