import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArtistNavbar from "./components/navbar/ArtistNavbar";

import {
  Home,
  Provider,
  Discovery,
  Help,
  UploadMusic,
  Login,
  Signup,
} from "./pages/pages";

const App = () => {
  const [artistToken, setArtistToken] = React.useState(null);
  return (
    <div>
      <BrowserRouter>
        <ArtistNavbar artistTk={artistToken} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/help" element={<Help />}></Route>
            <Route path="/discovery" element={<Discovery />}></Route>
            <Route path="/uploadmusic" element={<UploadMusic />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              path="/login"
              element={
                <Login artistTk={artistToken} setArtistTk={setArtistToken} />
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
