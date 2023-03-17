import { useState } from "react";
import { useArtistAuthContext } from "./useArtistAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useArtistAuthContext();

  const signup = async (
    email,
    confirmEmail,
    password,
    artistName,
    dob,
    gender
  ) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch("/api/artist/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        confirmEmail,
        password,
        artistName,
        dob,
        gender,
      }),
    });
    const json = await response.json();
    console.log(response);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.err);
    }

    if (response.ok) {
      localStorage.setItem("artistID", json.id);
      //update auth context
      dispatch({ type: "LOGIN", payload: json });
      //update loading state
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
