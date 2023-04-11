import { useState } from "react";

export const useVerify = () => {
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [verifyIsLoading, setVerifyIsLoading] = useState(false);
  const [verifyError, setVerifyError] = useState(null);

  const verifyResetCode = async (email, resetCode) => {
    try {
        setVerifyIsLoading(true);
      // Call your API endpoint to verify the reset code
      const response = await fetch("/api/users/verify-code", {
        method: "POST",
        body: JSON.stringify({ email, resetCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setIsCodeVerified(true);
      } else {
        setVerifyError(data.message);
      }
    } catch (error) {
        setVerifyError("Failed to verify reset code. Please try again.");
    } finally {
        setVerifyIsLoading(false);
    }
  };

  return {
    isCodeVerified,
    verifyIsLoading,
    verifyError,
    verifyResetCode,
  };
};

