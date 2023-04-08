import { useState } from "react";

export const useApproveEP = () => {
  const [approveEPError, setApproveEPError] = useState(null);
  const [approveEPIsLoading, setApproveEPIsLoading] = useState(false);
  const [approveEPStatus, setApproveEPStatus] = useState("");
  const approveEP = async (epID) => {
    setApproveEPIsLoading(true);
    setApproveEPError(null);
    const response = await fetch(`/api/eps/approved/${epID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      setApproveEPStatus(json.error);
    }
    if (response.ok) {
      setApproveEPStatus("success");
    }

    setApproveEPIsLoading(false);
  };

  return { approveEP, approveEPError, setApproveEPIsLoading, approveEPStatus };
};
