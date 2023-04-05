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
const App = () => {
  return (
    <BrowserRouter>
      <Container fluid className="bg-secondary min-vh-100">
        <Row>
          <Col
            xs={12}
            md={2}
            className="bg-white vh-100"
            style={{ position: "fixed" }}
          >
            <Sidebar />
          </Col>
          <Col
            xs={12}
            md={10}
            className="min-vh-100"
            style={{ marginLeft: "16.6666667%" }}
          >
            <nav className="navbar navbar-light bg-transparent"></nav>
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/user" element={<Users />} />
              <Route path="/artist" element={<Artist />} />
              <Route path="/song" element={<Song />} />
              <Route path="/album" element={<Album />} />
              <Route path="/ep" element={<EP />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/admin" element={<Admin />} />
              {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
