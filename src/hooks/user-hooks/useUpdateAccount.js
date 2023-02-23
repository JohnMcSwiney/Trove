import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateAccount = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const updateAccount = async (name, dob) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/ua", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dob }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.err);
      setIsLoading(false);
    }

    if (response.ok) {
      setIsLoading(false);
    }
  };

  return { updateAccount, error, isLoading };
};
