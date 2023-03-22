import { createContext, useReducer, useEffect, useState } from "react";

export const ArtistAuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { artist: action.payload };

    case "LOGOUT":
      return { artist: null };

    default:
      return state;
  }
};

export const ArtistAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    artist: null,
  });

  useEffect(() => {
    const artist = JSON.parse(localStorage.getItem("artist"));
    if (artist) {
      dispatch({ type: "LOGIN", payload: artist });
    }
  }, []);

  return (
    <ArtistAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ArtistAuthContext.Provider>
  );
};
