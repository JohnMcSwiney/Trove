import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

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
    });
  };

  return { logout };
};
