import { useState } from "react";

export const useUpdateEmail = () => {
  const [emailError, setEmailError] = useState(null);
  const [emailIsLoading, setEmailIsLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const updateEmail = async (currentEmail, newEmail, cPassword) => {
    setEmailIsLoading(true);
    setEmailError(false);

    const userId = JSON.parse(localStorage.getItem("user")).id;

    const response = await fetch(`/api/users/ue/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentEmail, newEmail, cPassword }),
    });

    const json = await response.json();

    if (!response.ok) {
      setEmailError(json.error);
    }
    setEmailMessage(json.success);
    setEmailIsLoading(false);
    const user = JSON.parse(localStorage.getItem("user"));
    user.email = newEmail;
    localStorage.setItem("user", JSON.stringify(user));
  };
  return { updateEmail, emailError, emailIsLoading, emailMessage };
};
