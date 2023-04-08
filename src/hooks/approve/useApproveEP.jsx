import { useState } from "react";

export const useApproveEP = () => {
  const [approveEPError, setApproveEPError] = useState(null);
  const [approveEPIsLoading, setApproveEPIsLoading] = useState(false);

  const approveEP = async (epID) => {
    setApproveEPIsLoading(true);
    setApproveEPError(null);
    const response = await fetch(`/api/eps/approved/${epID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      setApproveEPError(json.error);
    }

    setApproveEPIsLoading(false);
  };

  return { approveEP, approveEPError, setApproveEPIsLoading };
};
