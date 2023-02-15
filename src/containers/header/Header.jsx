import React from "react";
import './header.css';
import { useLogout } from "../../hooks/useLogout";

import {Dropdown,ButtonGroup} from 'react-bootstrap';
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineUser} from 'react-icons/ai' 
import {RiUser5Line} from 'react-icons/ri' //for signup
import {RiLoginBoxLine, RiLogoutBoxLine, RiUpload2Line} from 'react-icons/ri' // login out , upload

function Header() {
  const {logout} = useLogout();

  const logoutHandler = ()=> {
    logout();
  }

  return (
    <div class="d-flex sticky-top">
      <div class=" p-2">
        <a class="trove-logo-link navbar-brand" href="/">
        <img src="./img/troveIcon.png" alt="Trove logo" className="trove-logo"/>
          <h1 className="trove-logo-link">
            <span className="span">Trove</span> Music
          </h1>
        </a>
      </div>

      <div class="ml-auto p-2">
        <Dropdown>
          <Dropdown.Toggle  id="dropdown-basic" style={{backgroundColor:"#393bd0" }}>
          <AiOutlineUser/>Me
          </Dropdown.Toggle>

          <Dropdown.Menu style={{backgroundColor:"#393bd0"}} >
              <div className="dd-backg">
                <RiUpload2Line style={{color:"white"}}/>
              <a href="/upload" className="uploadbtn btn text-light">Upload</a>
              </div>
              
              <div className="dd-backg">
                <RiUser5Line style={{color:"white"}}/>
                <a href="/signup" class="signupbtn btn text-light">  Sign up</a>
              </div>

              <div className="dd-backg">
                <RiLoginBoxLine  style={{color:"white"}} />
                <a href="/login "className="loginbtn btn text-light" >Log in</a>  
              </div>
              <div className="dd-backg">
              <RiLogoutBoxLine  style={{color:"white"}} />
                <button className="logout btn text-light"
                onClick={logoutHandler}
                >Log out</button>
            </div>
        
          </Dropdown.Menu>
      </Dropdown>
      
      </div>
    </div>
  );
}

export default Header;