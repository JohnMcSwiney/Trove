import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useDeletePlaylist = () => {
  const [deleteError, setdeleteError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const deletePlaylist = async (id) => {
    const deletePlaylistObject = async () => {
      const res = await fetch(`/api/playlists/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      const data = await res.json();

      console.log("Delete Playlist Object: " + res);

      if (!res.ok) {
        setdeleteError(data.error);
      }
    };

    await deletePlaylistObject();
    if (!deleteError) {
      navigate("/mytrove");
      // window.location.reload(false);
    }
  };

  return { deletePlaylist, deleteError };
};
