import { useState } from "react";
export const useDeleteAlbum = () => {
  const [loadingDetele, setLoadingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteAlbum = async (id) => {
    setLoadingDelete(true);
    setDeleteError(null);

    const response = await fetch(`/api/albums/${id}`, {
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
  return { deleteAlbum, deleteError, loadingDetele };
};
