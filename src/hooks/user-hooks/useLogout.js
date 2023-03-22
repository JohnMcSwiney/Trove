import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // remove cookie
    fetch("/api/user/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      // dispatch logout action
      dispatch({ type: "LOGOUT" });
      navigate("/");
      window.location.reload(false);
    });
  };

  return { logout };
};
