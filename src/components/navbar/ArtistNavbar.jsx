import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import "./navbar.css";
import { useLogout } from "../../hooks/useLogout";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const ArtistNavbar = () => {
  const [state, setState] = React.useState(1);

  const [colorbg, setColorBg] = React.useState("home-color");

  const sessionToken = sessionStorage.getItem("artistToken");

  // console.log(sessionToken);
  const action = (index) => {
    setState(index);
  };

  const navRef = React.useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const { logout } = useLogout();
  const logoutArtist = () => {
    logout();
  };
  return (
    <div>
      <div>
        <header className={`header-nav ${colorbg}`}>
          <a className="nav-brand" href="/">
            <h3>
              <span className="trovemusic-span">TroveMusic.</span> for Artist
            </h3>
          </a>

          <nav ref={navRef}>
            <NavLink
              to="/"
              className={`${state === 1 ? "active-tab " : ""} `}
              onClick={() => {
                action(1);
                setColorBg("home-color");
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/help"
              className={`${state === 2 ? "active-tab " : ""} `}
              onClick={() => {
                action(2);
                setColorBg("help-color");
              }}
            >
              Help
            </NavLink>
            <NavLink
              to="/discovery"
              className={`${state === 3 ? "active-tab " : ""} `}
              onClick={() => {
                action(3);
                setColorBg("discovery-color");
              }}
            >
              Discovery
            </NavLink>

            <NavLink
              to="/uploadmusic"
              className={`${state === 4 ? "active-tab " : ""} `}
              onClick={() => {
                action(4);
                setColorBg("uploadmusic-color");
              }}
            >
              Upload Music
            </NavLink>

            <NavLink
              to="/provider"
              className={`${state === 5 ? "active-tab " : ""} `}
              onClick={() => {
                action(5);
                setColorBg("provider-color");
              }}
            >
              Provider
            </NavLink>

            <div class="vl">
              {sessionToken !== null ? (
                <>
                  <button className="btn text-white" onClick={logout}>
                    Logout
                  </button>

                  <DropdownButton
                    id="dropdown-basic-button"
                    variant="info"
                    title="Settings"
                    menuVariant="dark"
                  >
                    <Dropdown>
                      <NavLink to={"/access"}>Get Access</NavLink>
                    </Dropdown>
                    <Dropdown>
                      <NavLink to={"/settings"}>Account Setting</NavLink>
                    </Dropdown>
                  </DropdownButton>
                </>
              ) : (
                <div className="signup-div">
                  <NavLink to={"/signup"}>Sign up</NavLink>
                  <NavLink to={"/access"}>Get access</NavLink>
                </div>
              )}
            </div>
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
          } help`}
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
          } uploadmusic`}
          onClick={() => action(4)}
        >
          <div className="contact-contain">
            <h1>4</h1>
            <p>4</p>
          </div>
        </div>

        <div
          className={`${
            state === 5 ? "active-content text-light" : "content"
          } provider`}
          onClick={() => action(5)}
        >
          <div className="contact-contain">
            <h1>5</h1>
            <p>5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistNavbar;
