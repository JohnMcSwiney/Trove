import { createContext, useReducer, useEffect } from "react";

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
    fetch("/api/session") // Make a GET request to the server to get the current session
      .then((res) => res.json())
      .then((data) => {
        if (data.artist) {
          dispatch({ type: "LOGIN", payload: data.artist }); // If there's an artist in the session, set it as the current authenticated user
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ArtistAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ArtistAuthContext.Provider>
  );
};

// export const ArtistAuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     artist: null,
//   });

//   useEffect(() => {
//     const artist = JSON.parse(localStorage.getItem("artist"));

//     if (artist) {
//       dispatch({ type: "LOGIN", payload: artist });
//     }
//   }, []);
