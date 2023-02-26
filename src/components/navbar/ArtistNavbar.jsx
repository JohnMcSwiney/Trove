import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import "./navbar.css";
const ArtistNavbar = () => {
  const [state, setState] = React.useState(1);

  const [colorbg, setColorBg] = React.useState("");

  const action = (index) => {
    setState(index);

    if (state == 1) {
      setColorBg("home-color");
    }

    if (setState(index) == 2) {
      setColorBg("home-about");
    }

    if (setState(index) === 3) {
      setColorBg("home-discovery");
    }

    if (setState(index) === 4) {
      setColorBg("context-color");
    }
    console.log(colorbg);
  };

  const navRef = React.useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  return (
    <div>
      <div>
        <header className={`${colorbg}`}>
          <h3>TroveMusic for Artist</h3>
          <nav ref={navRef}>
            <NavLink
              to="/"
              className={`${state === 1 ? "active-tab " : ""} `}
              onClick={() => action(1)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={`${state === 2 ? "active-tab " : ""} `}
              onClick={() => action(2)}
            >
              About
            </NavLink>
            <NavLink
              to="/discover"
              className={`${state === 3 ? "active-tab " : ""} `}
              onClick={() => action(3)}
            >
              Discovery
            </NavLink>
            <NavLink
              to="/contact"
              className={`${state === 4 ? "active-tab " : ""} `}
              onClick={() => action(4)}
            >
              Contact
            </NavLink>

            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
          <button className="nav-btn" onClick={showNavbar}>
            <FaBars />
          </button>
        </header>
      </div>

      <div className="header-contents">
        <div
          className={`${
            state === 1 ? "active-content text-light" : "content"
          } home`}
          onClick={() => action(1)}
        >
          <div className="home-contain">
            <h1>1</h1>
            <p>1</p>
          </div>
        </div>

        <div
          className={`${
            state === 2 ? "active-content text-light" : "content"
          } about`}
          onClick={() => action(2)}
        >
          <div className="about-contain">
            <h1>2</h1>
            <p>2</p>
          </div>
        </div>

        <div
          className={`${
            state === 3 ? "active-content text-light" : "content"
          } discovery`}
          onClick={() => action(3)}
        >
          <div className="discovery-contain">
            <h1>3</h1>
            <p>3</p>
          </div>
        </div>

        <div
          className={`${
            state === 4 ? "active-content text-light" : "content"
          } contact`}
          onClick={() => action(4)}
        >
          <div className="contact-contain">
            <h1>4</h1>
            <p>4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistNavbar;
