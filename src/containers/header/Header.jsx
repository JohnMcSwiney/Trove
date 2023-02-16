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
  const {logout} = useLogout();
  const {user} = useAuthContext();
  const logoutHandler = ()=> {
    logout();
  }

  const navigate = useNavigate();
  const goBack = ()=> {
    navigate(-1);
  }
  return (
    <div className="d-flex justify-content-between sticky-top bg-fglass-b">
      <button className="back-button" onClick={goBack}>
        <MdKeyboardBackspace className="back-icon"/>
      </button>
      <div className=" p-2">
        <a className="trove-logo-link navbar-brand" href="/">
        <img src="./img/troveIcon.png" alt="Trove logo" className="trove-logo"/>
          <h1 className="trove-logo-link">
            <span className="span">Trove</span> Music
          </h1>
        </a>
      </div>

      <div className="p-2">
        <Dropdown>
          <Dropdown.Toggle  id="dropdown-basic" style={{backgroundColor:"#393bd0"}}>
          {/* work on this to get the id */}
            {user&& (<div>{user._id}</div>)} 
            {!user && (<div><AiOutlineUser/>Me</div>)}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{backgroundColor:"#393bd0"}} >
              <div className="dd-backg">
                <RiUpload2Line style={{color:"white"}}/>
              <a href="/upload" className="uploadbtn btn text-light">Upload</a>
              </div>
              {user && (
                <div className="dd-backg">
                  <RiLogoutBoxLine  style={{color:"white"}} />
                    <button className="logout btn text-light"
                    onClick={logoutHandler}
                    >Log out</button>
                </div>
              )}

              {!user && (
                <>
              <div className="dd-backg">
                <RiUser5Line style={{color:"white"}}/>
                <a href="/signup" class="signupbtn-nav btn text-light">  Sign up</a>
              </div>

              <div className="dd-backg">
                <RiLoginBoxLine  style={{color:"white"}} />
                <a href="/login "className="loginbtn-nav btn text-light" >Log in</a>  
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