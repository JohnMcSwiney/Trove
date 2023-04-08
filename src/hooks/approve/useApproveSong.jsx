import { useState } from "react";

export const useApproveSong = () => {
  const [approveError, setApproveError] = useState(null);
  const [approveIsLoading, setApproveIsLoading] = useState(false);

  const approveSong = async (songID) => {
    setApproveIsLoading(true);
    setApproveError(null);
    const response = await fetch(`/api/songs/approved/${songID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      setApproveError(json.error);
    }

    setApproveIsLoading(false);
  };

  return { approveSong, approveError, approveIsLoading };
};
