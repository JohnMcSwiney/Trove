import { AuthArtistContext } from "../../contexts/ArtistAuthContext";
import { useContext } from "react";

export const useArtistAuthContext = () => {
  const context = useContext(AuthArtistContext);
  if (!context) {
    throw Error(
      "useArtistAuthContext must be used insde of AuthArtistContextProvider"
    );
  }
  return context;
};
