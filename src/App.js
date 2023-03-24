import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArtistNavbar from "./components/navbar/ArtistNavbar";

import {
  Home,
  Help,
  UploadMusic,
  Login,
  Signup,
  AccountSetting,
} from "./pages/pages";

const App = () => {
  const [artistToken, setArtistToken] = React.useState(null);
  return (
    <div>
      <BrowserRouter>
        <ArtistNavbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/help" element={<Help />}></Route>

            <Route path="/uploadmusic" element={<UploadMusic />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/settings" element={<AccountSetting />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
