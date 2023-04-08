import { useState } from "react";

export const useRejectEP = () => {
  const [rejectEPError, setRejectEPError] = useState(null);
  const [rejectEPIsLoading, setRejectEPIsLoading] = useState(false);
  const [rejectEPStatus, setRejectEPStatus] = useState("");

  const rejectEP = async (epID, message) => {
    setRejectEPError(null);
    setRejectEPIsLoading(true);
    const response = await fetch(`/api/eps/rejected/${epID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const json = await response.json();

    if (!response.ok) {
      setRejectEPError(json.error);
    }

    if (response.ok) {
      setRejectEPStatus("success");
      setRejectEPIsLoading(false);
    }
  };

  return {
    rejectEP,
    rejectEPError,
    rejectEPIsLoading,
    rejectEPStatus,
  };
};
