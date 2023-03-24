import { useState } from "react";
import { useArtistAuthContext } from "./useArtistAuthContext";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useArtistAuthContext();
  const navigate = useNavigate();
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
      localStorage.setItem("artist", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }
    setIsLoading(false);
  };
  return { login, isLoading, error };
};
