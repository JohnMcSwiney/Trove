import { useState } from "react";

export const useUpdateGmail = () => {
  const [updateGmailError, setUpdateGmailError] = useState(null);
  const [isLoadingUpdateEmail, setIsLoadingUpdateEmail] = useState(false);
  const [emailMessage, setMessage] = useState("")
  const artistID = JSON.parse(localStorage.getItem("artist")).id;
  const updateEmail = async (currentEmail, newEmail, cPassword) => {
    setUpdateGmailError(null);
    setIsLoadingUpdateEmail(true);

    const response = await fetch(`/api/artists/updateemail/${artistID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cPassword, currentEmail, newEmail }),
    });

    const json = await response.json();
    if (!response.ok) {
      setUpdateGmailError(json.error);
    }

    if(response.ok){
      const artist = JSON.parse(localStorage.getItem("artist"));

    artist.email = newEmail;
    localStorage.setItem("artist", JSON.stringify(artist));
    setMessage(json.success)

    }
    
    setIsLoadingUpdateEmail(false);
  };
  return { updateEmail, updateGmailError, isLoadingUpdateEmail, emailMessage };
};
