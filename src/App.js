import React from "react";
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
const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="container-fluid bg-secondary min-vh-100">
          <div className="row">
            <div
              className="col-2 bg-white vh-100"
              style={{ position: "fixed" }}
            >
              <Sidebar />
            </div>

            <div
              className="col-auto min-vh-100"
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
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
