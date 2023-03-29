import React from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import "./login.css"
 
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin();
  const artistID = localStorage.getItem("artist");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (localStorage.getItem("artist")) {
        navigate("/");
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  React.useEffect(() => {
    if (artistID) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="artist--login">
      <h1>Login with TroveMusic</h1>
      <form onSubmit={handleLogin}>
        <label for="email">Email</label>
        <input
          className="form-control"
          id="email"
          type={"email"}
          placeholder="Enter your email."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label for="password">Password</label>
        <input
          className="form-control"
          id="password"
          type={"password"}
          placeholder="Enter your password."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success">Login</button>
      </form>
      {error && <p>{error.error}</p>}
    </div>
  );
};

export default Login;
