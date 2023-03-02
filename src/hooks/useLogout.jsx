import { useState } from "react";
import { useArtistAuthContext } from "./useArtistAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/artist/logout");
      const data = await response.json();
      if (response.ok) {
        setIsLoading(false);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while logging out.");
    } finally {
      setIsLoading(false);
      sessionStorage.removeItem("artistToken");
    }
  };
  return { logout, isLoading, error };
};
