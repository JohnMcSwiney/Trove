import { useAuthContext } from "../../../hooks/user-hooks/useAuthContext";
import "./CardDiscovery.css";
import React from "react";

const discovery_card = () => {
  return (
    <div className="DG-card-container">
      <div className="DG-bg-Img">
        <div className="DG-title-card">
          <h1 className="DG_title">
            <strong>Discovery </strong>Game
          </h1>
        </div>
      </div>
    </div>
  );
};

export default discovery_card;
