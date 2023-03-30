import React from "react";

export const useUpdatePassword = () => {
  const [passwordError, setPasswordError] = React.useState(null);
  const [passwordIsLoading, setPasswordIsLoading] = React.useState(false);
  const [passwordMessage, setPasswordMessage] = React.useState("");
  const updatePassword = async (password, newPassword, confirmNewPassword) => {
    setPasswordIsLoading(true);
    setPasswordError(false);

    const userId = JSON.parse(localStorage.getItem("user")).id;

    const response = await fetch(`/api/users/up/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, newPassword, confirmNewPassword }),
    });

    const json = await response.json();

    if (!response.ok) {
      setPasswordError(json.error);
    }

    setPasswordMessage(json.success);

    setPasswordIsLoading(false);
  };

  return { updatePassword, passwordError, passwordIsLoading, passwordMessage };
};
