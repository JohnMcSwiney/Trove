import { useState } from "react";

export const useCreateAdmin = () => {
  const [createError, setCreateError] = useState(null);
  const [createIsloading, setCreateIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const createAdmin = async (email, password, adminName) => {
    setCreateError(null);
    setCreateIsLoading(true);

    const response = await fetch(`/api/admins/createAdmin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, adminName }),
    });

    const json = await response.json();

    if (!response.ok) {
      setCreateError(json.error);
    }

    if (response.ok) {
      setMessage(json.success);
    }
    setCreateIsLoading(false);
  };

  return { createAdmin, createError, createIsloading, message };
};
