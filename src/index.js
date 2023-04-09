import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext, AuthContextProvider } from "./contexts/AuthContext";
import { MusicProvider } from "./contexts/MusicContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <MusicProvider>
      <App />
    </MusicProvider>
  </AuthContextProvider>
);
