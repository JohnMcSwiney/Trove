import { ArtistAuthContext } from "../context/ArtistAuthContext";
import { useContext } from "react";

export const useArtistAuthContext = () => {
  const context = useContext(ArtistAuthContext);

  if (!context) {
    console.log(context);
    throw Error(
      "useArtistAuthContext must be used inside of AuthContextProvider"
    );
  }
  return context;
};
