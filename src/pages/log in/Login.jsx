import React from "react";
import { useLogin } from "../../hooks/user-hooks/useLogin";
import { Navigate, useNavigate } from "react-router-dom";
import "./login.css";
import ChangePassword from "../../components/changePasswordModal/ChangePassword";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import useFBLogin from "../../hooks/facebook-auth/useFBLogin";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  // Redirect the user to the home page if they are already logged in
  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [localStorage.getItem("user"), navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (localStorage.getItem("user")) {
        navigate("/");
      }
    } catch (err) {
      console.log(err.data?.message || "Please try again");
      return;
    }
  };

  const { loginFB, fbisLoading, fberror } = useFBLogin();
  const handleFaceBookLogin = (e) => {
    e.preventDefault();
    try {
      loginFB();
      if (localStorage.getItem("user")) {
        navigate("/");
      }
    } catch (fberror) {
      console.log(fberror.data?.message || "Facebook is having some errors");
    }
  };

  return (
    <div className="container">
      <form className="user-login" onSubmit={handleSubmit}>
        <h1 className="user-login-header">Log in</h1>

        <div className="user-login-container">
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="emailbox">
              Email
            </label>
            <input
              type="email"
              id="emailbox"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="passwordbox">
              Password
            </label>
            <input
              type="password"
              id="passwordbox"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="row mb-4">
            <div className="col">
              <ChangePassword/>
            </div>
          </div>

          <div className="buttonCont">
            <button
              disabled={isLoading}
              className="user-loginbtn text-light"
              type="submit"
            >
              Log in
            </button>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="buttonCont">
        <a href="/signup" className="text-light" role="button">
          <button className="user-signupbtn">Sign up</button>
        </a>
      </div>

      <div className="user-go-fa-div">
        <p>Continue with</p>
        <div className="user-go-fa-wrap">
          <div className="go">
            <BsGoogle className="go-icon" />
          </div>
          <div className="fa" onClick={handleFaceBookLogin}>
            <BsFacebook className="fa-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
