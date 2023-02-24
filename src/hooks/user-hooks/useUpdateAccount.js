import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateAccount = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateAccount = async (displayName, dob) => {
    setIsLoading(true);
    setError(null);

    const userId = JSON.parse(localStorage.getItem("user")).id;

    const response = await fetch(`/api/users/ua/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, dob }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.err);
    }

    setIsLoading(false);
  };

  return { updateAccount, error, isLoading };
};
