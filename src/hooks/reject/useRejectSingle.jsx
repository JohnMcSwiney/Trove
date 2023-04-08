import { useState } from "react";

export const useRejectSingle = () => {
  const [rejectSingleError, setRejectSingleError] = useState(null);
  const [rejectSingleIsLoading, setRejectSingleIsLoading] = useState(false);
  const [rejectSingleStatus, setRejectSingleStatus] = useState("");

  const rejectSingle = async (songID, message) => {
    setRejectSingleError(null);
    setRejectSingleIsLoading(true);
    const response = await fetch(`/api/songs/rejected/${songID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const json = await response.json();

    if (!response.ok) {
      setRejectSingleError(json.error);
    }

    if (response.ok) {
      setRejectSingleStatus("success");
      setRejectSingleIsLoading(false);
    }
  };

  return {
    rejectSingle,
    rejectSingleError,
    rejectSingleIsLoading,
    rejectSingleStatus,
  };
};
