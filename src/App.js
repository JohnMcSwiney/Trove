import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArtistNavbar from "./components/navbar/ArtistNavbar";
import { Home, Provider, Discovery, Help, UploadMusic } from "./pages/pages";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ArtistNavbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/help" element={<Help />}></Route>
            <Route path="/discovery" element={<Discovery />}></Route>
            <Route path="/uploadmusic" element={<UploadMusic />}></Route>
            <Route path="/provider" element={<Provider />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
