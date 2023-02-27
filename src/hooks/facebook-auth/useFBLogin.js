import { useState } from "react";

const useFBLogin = () => {
  const [fbisLoading, setFBIsLoading] = useState(false);
  const [fberror, setFBError] = useState(null);

  const loginFB = async () => {
    setFBIsLoading(true);
    try {
      const response = await fetch("/auth/facebook", {
        method: "GET",
      });

      if (response.status === 200) {
        window.location.href = response.url;
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
