import React, { useState } from 'react'
import { RiFolderMusicLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import MusicBar from '../music bar/MusicBar'

import { AiOutlineHome } from 'react-icons/ai'  //for home icon
import { GoSearch } from 'react-icons/go'

import { VscAccount } from 'react-icons/vsc'
import { GiOpenTreasureChest } from 'react-icons/gi'
import './navbar.css'

const NavBar = (props) => {
  const activeTab = props.activeTab;
  const [active, setActive] = useState(0);

  const temp = [
    "q", "q", "q", "q"
  ];

  try {
    if (activeTab <= 3 && activeTab >= 0) {
      temp[activeTab] = 'active';
    } else {

      throw console.error();
    }
  } catch (error) {
    console.log(temp);
  }
  return (
    <>


      <div className="Nav">

        <Link className='trove-links nav-link' to={'/'}>

          <div
            className={active === 0 ? "active" : ""}
            onClick={() => setActive(0)}
          >
            <h1 hidden>Home</h1>
            <div className="trove-nav-icon">
              <div className='nav-icon'>
                <AiOutlineHome size={20} />
              </div>
              <div className='nav-text nav-text-active'>
                <p className='text-pad-t'>Home</p>
              </div>
              <div className="selection-indicator">

              </div>
            </div>
          </div>
        </Link>

        <div className='divider-white'></div>

        <Link to={'/search'} className='trove-links nav-link'>
          <div
            className={active === 1 ? "active" : ""}
            onClick={() => setActive(1)}
          >
            <h1 hidden>Search</h1>
            <div className="trove-nav-icon">
              <div className='nav-icon'>
                <GoSearch size={20} />
              </div>
              <div className='nav-text'>
                <p className='text-pad-t'>Search</p>
              </div>
              <div className="selection-indicator">

              </div>
            </div>
          </div>
        </Link>

        <div className='divider-white'></div>

        <Link to={'/mytrove'} className='trove-links nav-link'>
          <div
            className={active === 2 ? "active" : ""}
            onClick={() => setActive(2)}
          >
            <h1 hidden>My Trove / Library</h1>
            <div className="trove-nav-icon">
              <div className='nav-icon'>
                <GiOpenTreasureChest size={20} />
              </div>
              <div className='nav-text text-small'>
                <p className='text-small'>My Trove</p>
              </div>
              <div className="selection-indicator">

              </div>
            </div>
          </div>
        </Link>

        <div className='divider-white'></div>

        <Link to={'/myaccount'} className='trove-links nav-link'>
          <div
            className={active === 3 ? "active" : ""}
            onClick={() => setActive(3)}
          >
            <h1 hidden>Account</h1>
            <div className="trove-nav-icon">
              <div className='nav-icon'>
                <VscAccount size={20} />
              </div>
              <div className='nav-text'>
                <p className='text-pad-t'>Account</p>
              </div>
              <div className="selection-indicator">

              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default NavBar