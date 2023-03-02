import React from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin();
  const sessionToken = sessionStorage.getItem("artistToken");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      if (sessionToken) {
        props.setArtistTk(sessionToken);
        setTimeout(() => {
          navigate("/");
        }, "1000");
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };
  return (
    <div>
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
