import { useState } from "react";

export const useUpdatePassword = () => {
  const [updatePasswordError, setUpdatePasswordError] = useState(null);
  const [isLoadingUpdatePassword, setIsLoadingUpdatePassword] = useState(false);
const [passwordMessage, setMessage] = useState('')
  const artistID = JSON.parse(localStorage.getItem("artist")).id;
  const updatePassword = async (password, newPassword, confirmNewPassword) => {
    setUpdatePasswordError(null);
    setIsLoadingUpdatePassword(true);

    
    const response = await fetch(`/api/artists/updatepassword/${artistID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, newPassword, confirmNewPassword }),
    });

    const json = await response.json();
    if (!response.ok) {
      setUpdatePasswordError(json.error);
    }

    if(response.ok){
      setMessage(json.success)
    }
    setIsLoadingUpdatePassword(false);
  };
  return { updatePassword, updatePasswordError, isLoadingUpdatePassword, passwordMessage };
};
