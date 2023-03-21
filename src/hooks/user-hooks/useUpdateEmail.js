import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdateEmail = () => {
  const [emailError, setEmailError] = useState(null);
  const [emailIsLoading, setEmailIsLoading] = useState(false);
  const { user } = useAuthContext();
  const updateEmail = async (newEmail, password) => {
    setEmailIsLoading(true);
    setEmailError(false);

    const response = await fetch(`/api/users/ue/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setEmailError(json.err);
    }

    setEmailIsLoading(false);
  };
  return { updateEmail, emailError, emailIsLoading };
};
