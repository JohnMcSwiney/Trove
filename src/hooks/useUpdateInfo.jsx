import React from "react";

export const useUpdateInfo = () => {
  const [updateError, setUpdateError] = React.useState(null);
  const [isLoadingUpdate, setIsLoadingUpdate] = React.useState(false);

  const artistID = JSON.parse(localStorage.getItem("artist")).id;
  const updateInfo = async (artistName, dob) => {
    setIsLoadingUpdate(true);
    setUpdateError(null);
    const response = await fetch(`/api/artists/updateinfo/${artistID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artistName, dob }),
    });
    const json = await response.json();
    if (!response.ok) {
      setUpdateError(json.error);
    }

    const artist = JSON.parse(localStorage.getItem("artist"));
    artist.artistName = artistName;
    artist.dob = dob;
    localStorage.setItem("artist", JSON.stringify(artist));
    setIsLoadingUpdate(false);
  };
  return { updateInfo, updateError, isLoadingUpdate };
};
