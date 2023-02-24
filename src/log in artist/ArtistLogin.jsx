import React from "react";
import { useLogin } from "../hooks/user-hooks/useLogin";
import { useNavigate } from "react-router-dom";
import "./artist.css";

//icons
import { BsGoogle, BsFacebook } from "react-icons/bs";

const ArtistLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // setTimeout(()=>{
      //      navigate('/');
      // })
    } catch (err) {
      console.log(err.data?.message || "Please try again");
    }
  };
  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <div className="login-container">
          <div className="login-header">
            <h1>Log in</h1>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="emailbox">
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
            <label className="form-label" for="passwordbox">
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

          <div className="buttonCont">
            <button
              disabled={isLoading}
              className="loginbtn text-light"
              type="submit"
            >
              Log in
            </button>

            <a href="/signup" className="text-light" role="button">
              <button className="signupbtn">Sign up</button>
            </a>
          </div>

          <div className="continue-social-media">
            <div className="splitter"></div>

            <div className="continue-header">
              <p>Continue with</p>
            </div>

            <div className="continue-btns">
              <button>
                <BsGoogle />
              </button>
              <button>
                <BsFacebook />
              </button>
            </div>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default ArtistLogin;
