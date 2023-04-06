import { useState, useContext } from "react";
import { MusicContext } from "../../contexts/MusicContext";
export const useUnlikeSong = () => {
  const [unlikeError, setUnlikeError] = useState(null);
  const [unlikeIsLoading, setunLikeIsLoading] = useState(false);

  const { currentSong } = useContext(MusicContext);
  const user = localStorage.getItem("user");
  const userID = user ? JSON.parse(user).id : null;
  const unlike = async () => {
    setunLikeIsLoading(true);
    setUnlikeError(null);
    console.log(currentSong._id);
    const response = await fetch(`/api/songs/removelike/${currentSong._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userID }),
    });
    const json = await response.json();

    if (!response.ok) {
      setUnlikeError(json.error);
    }

    if (response.ok) {
      const user = localStorage.getItem("user");
      const likedSongs = user ? JSON.parse(user).likedSongs || [] : [];
      const songIndex = likedSongs.indexOf(currentSong._id);
      if (songIndex !== -1) {
        likedSongs.splice(songIndex, 1);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...JSON.parse(user), likedSongs })
        );
      }
    }
    setunLikeIsLoading(false);
  };

  return { unlike, unlikeError, unlikeIsLoading };
};
