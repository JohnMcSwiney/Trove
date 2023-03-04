import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useShowAllMusic = () => {
  // const [songs, setSongs] = useState([]);
  const [showMusicError, setShowMusicError] = useState(null);
  const [showMusicIsLoading, setShowMusicIsLoading] = useState(false);

  const showAllMusic = async () => {
    setShowMusicError(null);
    setShowMusicIsLoading(true);

    try {
      const response = await fetch("/api/songs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const songs = await response.json();

      if (!response.ok) {
        setShowMusicError(songs.err);
      }

      // setSongs(songs);
      setShowMusicIsLoading(true);
    } catch (error) {
      setShowMusicError(error.message);
      setShowMusicIsLoading(false);
    }
  };
  return { songs, showAllMusic, showMusicError, showMusicIsLoading };
};
