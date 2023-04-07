import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useCreateAdmin } from "../../hooks/login & signup/useCreateAdmin";
import { useAuth } from "../../context/AuthContext";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminName, setAdminName] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAdminNameChange = (event) => {
    setAdminName(event.target.value);
  };

  console.log(email);
  const { createAdmin, createError, createIsloading, message } =
    useCreateAdmin();
  const handleSubmit = (event) => {
    event.preventDefault();
    createAdmin(email, password, adminName);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const currentAdmin = localStorage.getItem("admin");
  const { authAdmin, isLoggedIn } = useAuth();
  return (
    <>
      <div>
        <h1>Hello {currentAdmin}</h1>
      </div>
      <div
        className="d-flex bg-light justify-content-center"
        style={{ width: "20%", float: "right" }}
      >
        <div>
          <h3 className="text-center mb-4">Create Admin</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAdminName">
              <Form.Label>Admin Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter admin name"
                value={adminName}
                onChange={handleAdminNameChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Admin;
