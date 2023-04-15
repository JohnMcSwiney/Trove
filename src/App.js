import React, { useState, useRef, useEffect } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import { AudioPlayer } from "./components/audioplayerOLD/AudioPlayer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./containers/header/Header";
import MusicBar from "./components/music bar/MusicBar";
import NavBar from "./components/nav bar/NavBar";
import MusicBarFullscreen from "./components/music bar/MusicBarFullscreen";
import "bootstrap/dist/css/bootstrap.min.css";
// will be Removed when taste profile is changed

import {
  Home,
  Search,
  MyTrove,
  MyAccount,
  Login,
  Signup,
  Artist,
  DiscoveryGame,
  AlbumPage,
  EpPage,
  FollowersPage,
  FollowingPage,
  PlaylistPage,
  UpdatePlaylist,
  CuratedPlaylist,
  ErrorPage
} from "./pages";
import CreatePlaylist from "./pages/playlist/createPlaylist/CreatePlaylist";

function App() {
  return (
    <BrowserRouter>
      <div className=" text-gray-500 font-body">
        <Header />
        <div className="body-wrap">
          <NavBar />
          <div className="clone-nav"></div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/mytrove" element={<MyTrove />}></Route>

            <Route path="/myaccount" element={<MyAccount />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/artist/">
              <Route path=":id" element={<Artist />}></Route>
            </Route>

            <Route path="/discoverygame" element={<DiscoveryGame />}></Route>

            <Route path="/albumpage/">
              <Route path=":id" element={<AlbumPage />}></Route>
            </Route>

            <Route path="/eppage/">
              <Route path=":id" element={<EpPage />}></Route>
            </Route>

            <Route path="/followers">
              <Route path=":id" element={<FollowersPage />}></Route>
            </Route>
            <Route path="/following" element={<FollowingPage />}></Route>
            <Route path="/playlist/">
              <Route path=":id" element={<PlaylistPage />}></Route>
            </Route>
            <Route path="/curated/">
              <Route path=":id" element={<CuratedPlaylist />}></Route>
            </Route>
            <Route path="/createplaylist" element={<CreatePlaylist />}></Route>
            <Route path="/editplaylist/">
              <Route path=":id" element={<UpdatePlaylist />}></Route>
            </Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </div>

        <MusicBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
