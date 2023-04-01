import { useState } from "react";
export const useDeleteSong = () => {
  const [loadingDetele, setLoadingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteSong = async (id) => {
    setLoadingDelete(true);
    setDeleteError(null);

    const response = await fetch(`/api/songs/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setDeleteError(json.error);
    }
    setLoadingDelete(false);
    window.location.reload(false);
  };
  return { deleteSong, deleteError, loadingDetele };
};
