import React from "react";
import "./errorPage.css";
import { NavLink, useNavigate } from "react-router-dom";
 
const ErrorPage = () => {

  return (
    <div className="music--errorpage">
        <div className="music--errorpage-msg">
            <h3 id="big404">404</h3>
            <h4>The path you were looking for isn't in any of our maps </h4>
            <NavLink to={"/"}>Return to Shore</NavLink>
        </div>
        <img src="../../assets/Map.png" alt="navicon" />
    </div>
  );
};

export default ErrorPage;