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

function Header(props) {
  const prop1 = props.headerTxt;
  const prop2 = props.displayBack;
  const prop3 = props.displayHamburger;
  const prop4 = props.displayTitle;

  const headTxt = ["Trove", "Music"];
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const logoutHandler = () => {
    logout();
  }

  const navigate = useNavigate();
  const goBack = ()=> {
    navigate(-1);
  }

  // for some reason only arrays work
  // index 0 corresponds to back-button
  // index 1 corresponds to dropdown
  // index 2 corresponds to title
  // ^ just in case <3
  const doDisplay = ["hidden", "hidden", "hidden"];
  if(prop2 == 1){
    doDisplay[0] = "q";
  }
  if(prop3 == 1){
    doDisplay[1] = "q";
  }
  if(prop4 == 2){
    doDisplay[2] = "q";
  }

  return (
    <div class="d-flex sticky-top nav-container bg-fglass">
      <button className={ `back-button ${doDisplay[0]}`} onClick={goBack} >
        <MdKeyboardBackspace className="back-icon" width={"50px"}/>
      </button>
      <div className={` p-2  `}>
        <a className={`trove-logo-link navbar-brand ${doDisplay[2]}`} href="/">
          <img src="./img/troveIcon.png" alt="Trove logo" className="trove-logo hidden" />
          <h1 className="trove-logo-link">
            <div className="header-txt bg-fglass-b">
              <span className="span">{prop1[0]}</span> {prop1[1]}
            </div>
          </h1>
        </a>

        <Dropdown className={`${doDisplay[1]}`}>
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