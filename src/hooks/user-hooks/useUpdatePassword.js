import React from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdatePassword = () => {
  const [passwordError, setPasswordError] = React.useState(null);
  const [passwordIsLoading, setPasswordIsLoading] = React.useState(false);
  const { user } = useAuthContext();
  const updatePassword = async (password, newPassword) => {
    setPasswordIsLoading(true);
    setPasswordError(false);

    const response = await fetch(`/api/users/up/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, newPassword }),
    });

    const json = await response.json();

    if (!response.ok) {
      setPasswordError(json.err);
    }

    setPasswordIsLoading(false);
  };

  return { updatePassword, passwordError, passwordIsLoading };
};
