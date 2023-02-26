import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArtistNavbar from "./components/navbar/ArtistNavbar";
import { Home, Contact, Discovery, About } from "./pages/pages";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ArtistNavbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/discovery" element={<Discovery />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
