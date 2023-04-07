import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useCreateAdmin } from "../../hooks/login & signup/useCreateAdmin";
import { useAuth } from "../../context/AuthContext";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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

  //fetch unverified data
  const [single, setSingle] = React.useState([]);
  React.useEffect(() => {
    const fetchUSingles = async () => {
      const response = await fetch("/api/songs/unverified", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (!response.ok) {
        return;
      }
      if (response.ok) {
        setSingle(json);
      }
    };
    fetchUSingles();
  }, []);

  const [albums, setAlbums] = React.useState([]);
  React.useEffect(() => {
    const fetchUAlbums = async () => {
      const response = await fetch("/api/albums/unverified", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (!response.ok) {
        return;
      }
      if (response.ok) {
        setAlbums(json);
      }
    };
    fetchUAlbums();
  }, []);

  const [eps, setEPs] = React.useState([]);
  React.useEffect(() => {
    const fetchUEPs = async () => {
      const response = await fetch("/api/eps/unverified", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (!response.ok) {
        return;
      }
      if (response.ok) {
        setEPs(json);
      }
    };
    fetchUEPs();
  }, []);

  return (
    <>
      <Container>
        <h1>Songs Verification</h1>
        <Row>
          <Col md={8}>
            <Tabs>
              <TabList>
                <Tab>Songs</Tab>
                <Tab>Albums</Tab>
                <Tab>EPs</Tab>
              </TabList>
              <TabPanel>
                <h2>Single Songs</h2>
                <table class="table table-dark table-bordered ">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">ARTIST</th>
                      <th scope="col">IMG</th>
                      <th scope="col">Approve</th>
                      <th scope="col">Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {single?.map((singleSongs) => (
                      <tr key={singleSongs._id}>
                        <th>{singleSongs.title}</th>
                        <th>{singleSongs?.artist?.artistName}</th>
                        <th>
                          <img src={singleSongs.imgUrl} width={"50px"} alt="" />
                        </th>
                        <th>V</th>
                        <th>X</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel>
                <h2>Album</h2>
                <table class="table table-dark table-bordered ">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">ARTIST</th>
                      <th scope="col">IMG</th>
                      <th scope="col">Approve</th>
                      <th scope="col">Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {albums?.map((albumSongs) => (
                      <tr key={albumSongs._id}>
                        <th>{albumSongs?.albumName}</th>
                        <th>{albumSongs?.artist?.artistName}</th>
                        <th>
                          <img
                            src={albumSongs.albumArt}
                            width={"50px"}
                            alt=""
                          />
                        </th>
                        <th>V</th>
                        <th>X</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel>
                <h2>EP</h2>
                <table class="table table-dark table-bordered ">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">ARTIST</th>
                      <th scope="col">IMG</th>
                      <th scope="col">Approve</th>
                      <th scope="col">Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eps?.map((epSongs) => (
                      <tr key={epSongs._id}>
                        <th>{epSongs?.epName}</th>
                        <th>{epSongs?.artist?.artistName}</th>
                        <th>
                          <img src={epSongs.epArt} width={"50px"} alt="" />
                        </th>
                        <th>V</th>
                        <th>X</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
            </Tabs>
          </Col>
          <Col md={3} xs={12} className="mt-3 mt-md-0">
            <div className="bg-light p-3">
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
