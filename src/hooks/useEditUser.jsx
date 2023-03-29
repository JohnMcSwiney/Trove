import { useState } from "react";

export const useEditUser = () => {
  const [editIsLoading, setEditIsLoading] = useState(false);
  const [editerror, setEditError] = useState(null);
  const [message, setMessage] = useState("");

  const editUser = async (id, avatar, displayName, dob, email, password) => {
    setEditError(null);
    setEditIsLoading(true);
    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, avatar, dob, email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      setEditError(json.error);
    }

    if (response.ok) {
      setMessage(json.success);
    }
    setEditIsLoading(false);
  };
  return { editUser, message, editerror, editIsLoading };
};
