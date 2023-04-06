import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLoginAdmin } from "../../hooks/login & signup/useLoginAdmin";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [cookies] = useCookies(["authAdmin"]);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  console.log(cookies);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const { loginAdmin, loginError, loginIsloading } = useLoginAdmin();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      loginAdmin(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">Admin Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-1">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
