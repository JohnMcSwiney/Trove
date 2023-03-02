import { useState } from "react";
import { useArtistAuthContext } from "./useArtistAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { dispatch } = useArtistAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch("/api/artist/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.err);
    }

    if (response.ok) {
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setLoggedIn(true);
      sessionStorage.setItem("artistToken", json.token);
    } else {
      setIsLoading(false);
    }
  };
  return { login, isLoading, error, loggedIn };
};
