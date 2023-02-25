import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateAccount = () => {
  const [error, setError] = useState(null);
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
    const user = JSON.parse(localStorage.getItem("user"));
    user.displayName = displayName;
    user.dob = dob;
    localStorage.setItem("user", JSON.stringify(user));
  };

  return { updateAccount, error, isLoading };
};
