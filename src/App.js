import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/dashboard/DashBoard";
import Users from "./pages/user/Users";
import Song from "./pages/song/Song";
import Album from "./pages/album/Album";
import EP from "./pages/ep/EP";
import Collection from "./pages/collection/Collection";
import Home from "./pages/home/Home";
import Artist from "./pages/artist/Artist";
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/login/AdminLogin";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
const App = () => {
  const { authAdmin, isLoggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Container fluid className="bg-secondary min-vh-100">
        <Row>
          {isLoggedIn ? (
            <Col
              xs={12}
              md={2}
              className="bg-white vh-100"
              style={{ position: "fixed" }}
            >
              <Sidebar />
            </Col>
          ) : null}

          <Col
            xs={12}
            md={10}
            className="min-vh-100"
            style={{ marginLeft: "16.6666667%" }}
          >
            <Routes>
              <Route
                path="/dashboard"
                element={isLoggedIn ? <DashBoard /> : <Navigate to="/" />}
              />
              <Route
                path="/user"
                element={isLoggedIn ? <Users /> : <Navigate to="/" />}
              />
              <Route
                path="/artist"
                element={isLoggedIn ? <Artist /> : <Navigate to="/" />}
              />
              <Route
                path="/song"
                element={isLoggedIn ? <Song /> : <Navigate to="/" />}
              />
              <Route
                path="/album"
                element={isLoggedIn ? <Album /> : <Navigate to="/" />}
              />
              <Route
                path="/ep"
                element={isLoggedIn ? <EP /> : <Navigate to="/" />}
              />
              <Route
                path="/collection"
                element={isLoggedIn ? <Collection /> : <Navigate to="/" />}
              />
              <Route
                path="/admin"
                element={isLoggedIn ? <Admin /> : <Navigate to="/login" />}
              />
              <Route path="/" element={<AdminLogin />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
