import React, { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider(props) {
  const [cookies, setCookie] = useCookies(["authAdmin"]);
  const [authAdmin, setAuthAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (authAdmin) {
    localStorage.setItem("TroveAdminToken", authAdmin.token);
  }

  const value = {
    authAdmin,
    setAuthAdmin,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
