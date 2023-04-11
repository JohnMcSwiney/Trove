import { useState } from "react";

export const useGetResetCode = () => {
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendResetCode = async (email) => {
    try {
      setLoading(true);
      // Call your API endpoint to send reset code to the email
      const response = await fetch("/api/users/forget-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setResetCodeSent(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    resetCodeSent,
    isLoading,
    error,
    sendResetCode,
  };
};


