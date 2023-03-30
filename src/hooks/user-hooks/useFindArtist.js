import { useState } from "react";

const useFindArtist = () => {
  const [artistError, setArtistError] = useState(null);
  const [artistIsLoading, setArtistIsLoading] = useState(false);

  const findArtist = async () => {
    setArtistIsLoading(true);
    setArtistError(null);

    const response = await fetch(`/api/artists/${artistID}`);

    const json = await response.json();

    if (!response.ok) {
      setArtistError(json.error);
    }

    setArtistIsLoading(false);
  };

  return { findArtist, artistError, artistIsLoading };
};
