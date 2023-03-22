import { useArtistAuthContext } from "./useArtistAuthContext";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const { dispatch } = useArtistAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("artistToken");
    localStorage.removeItem("artistID");
    fetch("/api/artist/logout")
      .then(() => {
        // dispatch logout action
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .then(() => {
        window.location.reload(false);
      });
  };

  return { logout };
};
