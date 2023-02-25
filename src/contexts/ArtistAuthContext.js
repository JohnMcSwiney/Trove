import { createContext, useReducer, useEffect } from "react";

export const AuthArtistContext = createContext();

export const authArtistReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { artist: action.payload };

    case "LOGOUT":
      return { artist: null };

    default:
      return state;
  }
};

export const AuthArtistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authArtistReducer, {
    artist: null,
  });

  useEffect(() => {
    const artist = JSON.parse(localStorage.getItem("artist"));

    if (artist) {
      dispatch({ type: "LOGIN", payload: artist });
    }
  }, []);

  return (
    <AuthArtistContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthArtistContext.Provider>
  );
};
