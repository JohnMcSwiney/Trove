import React from "react";

export const useUpdatePassword = () => {
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordIsLoading, setPasswordIsLoading] = React.useState(false);

  const updatePassword = async (password, newPassword) => {
    setPasswordIsLoading(true);
    setPasswordError(false);

    const userId = JSON.parse(localStorage.getItem("user")).id;

    const response = await fetch(`/api/users/up/${userId}`, {
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
