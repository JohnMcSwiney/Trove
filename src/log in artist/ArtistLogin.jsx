import React from "react";
// import { useLogin } from "../hooks/user-hooks/useLogin";
import { Navigate, useNavigate } from "react-router-dom";
import "./artistLogin.css";

import { BsGoogle, BsFacebook } from "react-icons/bs";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login(email, password);
  //     if (localStorage.getItem("user")) {
  //       navigate("/");
  //     }
  //   } catch (err) {
  //     console.log(err.data?.message || "Please try again");
  //     return;
  //   }
  // };

  return (
    <div className="container">
      {/* onSubmit={handleSubmit} */}
      <form className="artist-login">
        <h1 className="artist-login-header">
          Log in <span className="artist-span">Artist</span>
        </h1>

        <div className="artist-login-container">
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
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <div className="buttonCont-artist">
            <button
              // disabled={isLoading}
              className="user-loginbtn text-light"
              type="submit"
            >
              Log in
            </button>
          </div>
        </div>
        {/* {error && <div className="error">{error}</div>} */}
      </form>
      <div className="buttonCont-artist">
        <a href="/signup" className="text-light" role="button">
          <button className="artist-signupbtn">Sign up</button>
        </a>
      </div>
      <div className="artist-go-fa-div">
        <p>Continue with</p>
        <div className="artist-go-fa-wrap">
          <div className="go">
            <BsGoogle className="go-icon" />
          </div>
          <div className="fa">
            <BsFacebook className="fa-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
