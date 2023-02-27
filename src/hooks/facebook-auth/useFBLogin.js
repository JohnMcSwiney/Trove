import { useState } from "react";
import { useAuthContext } from "./../user-hooks/useAuthContext";
const useFBLogin = () => {
  const [fbisLoading, setFBIsLoading] = useState(false);
  const [fberror, setFBError] = useState(null);

  const { dispatch } = useAuthContext();

  const loginFB = async () => {
    setFBIsLoading(true);
    try {
      const response = await fetch("/auth/facebook", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        // Create user object with necessary information
        const user = {
          id: data.id,
          displayName: data.displayName,
          provider: data.provider,
          picture: data.picture.data.url,
        };
        const json = await response.json();
        // Save user object to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "LOGIN", payload: json });
        window.location.href = data.redirectUrl;
      } else {
        throw new Error("Failed to Login with Facebook");
      }
    } catch (err) {
      setFBError(err);
    } finally {
      setFBIsLoading(false);
    }
  };

  return { loginFB, fbisLoading, fberror };
};

export default useFBLogin;
