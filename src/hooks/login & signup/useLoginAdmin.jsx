import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export const useLoginAdmin = () => {
  const [loginError, setLoginError] = useState(null);
  const [loginIsloading, setLoadingIsLoading] = useState(false);
  const navigate = useNavigate();
  const { authAdmin, setAuthAdmin, isLoggedIn, setIsLoggedIn } = useAuth();
  const loginAdmin = async (email, password) => {
    setLoginError(null);
    setLoadingIsLoading(true);

    const response = await fetch(`/api/admins/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoginError(json.error);
    }

    if (response.ok) {
      setIsLoggedIn(true);
      setAuthAdmin(json);
      localStorage.setItem("admin", json.adminName); // Store adminName in local storage
      navigate("/dashboard");
    }
    setLoadingIsLoading(false);
  };
  return { loginAdmin, loginError, loginIsloading };
};
