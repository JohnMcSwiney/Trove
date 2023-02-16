import React from "react";
import './header.css';
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

import {Dropdown,ButtonGroup} from 'react-bootstrap';
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineUser} from 'react-icons/ai' 
import {RiUser5Line} from 'react-icons/ri' //for signup
import {RiLoginBoxLine, RiLogoutBoxLine, RiUpload2Line} from 'react-icons/ri' // login out , upload
import {MdKeyboardBackspace} from 'react-icons/md' //back button
import { useNavigate } from "react-router-dom";

function Header() {
  const headerTxt = ["Trove", "Music"];
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const logoutHandler = () => {
    logout();
  }

  const navigate = useNavigate();
  const goBack = ()=> {
    navigate(-1);
  }
  return (
    <div class="d-flex sticky-top">
      <button className="back-button" onClick={goBack}>
        <MdKeyboardBackspace className="back-icon" width={"50px"}/>
      </button>
      <div class=" p-2">
        <a class="trove-logo-link navbar-brand" href="/">
          <img src="./img/troveIcon.png" alt="Trove logo" className="trove-logo" />
          <h1 className="trove-logo-link">
            <div className="header-txt bg-fglass-b">
              <span className="span">{headerTxt[0]}</span> {headerTxt[1]}
            </div>
          </h1>
        </a>

        <Dropdown>
          <Dropdown.Toggle className="dropdown-toggle-style" id="dropdown-toggle hidden-arrow" style={{ content: "-" }}>
            {/* work on this to get the id */}
            {user && (<div>{user._id}</div>)}
            {!user && (<div><AiOutlineUser /></div>)}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ backgroundColor: "#393bd0" }} >
            <div className="dd-backg">
              <RiUpload2Line style={{ color: "white" }} />
              <a href="/upload" className="uploadbtn btn text-light">Upload</a>
            </div>
            {user && (
              <div className="dd-backg">
                <RiLogoutBoxLine style={{ color: "white" }} />
                <button className="logout btn text-light"
                  onClick={logoutHandler}
                >Log out</button>
              </div>
            )}

            {!user && (
              <>
                <div className="dd-backg">
                  <RiUser5Line style={{ color: "white" }} />
                  <a href="/signup" class="signupbtn btn text-light">  Sign up</a>
                </div>

                <div className="dd-backg">
                  <RiLoginBoxLine style={{ color: "white" }} />
                  <a href="/login " className="loginbtn btn text-light" >Log in</a>
                </div>
              </>
            )}

          </Dropdown.Menu>
        </Dropdown>

      </div>
    </div>
  );
}

export default Header;