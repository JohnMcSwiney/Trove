import React, { useState } from 'react'
import { RiFolderMusicLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
// import MusicBar from '../music bar/MusicBar'
import { AiOutlineHome } from 'react-icons/ai'  //for home icon
import { GoSearch } from 'react-icons/go'
import { RiUpload2Line } from 'react-icons/ri'
import { VscAccount } from 'react-icons/vsc'
import { GiOpenTreasureChest } from 'react-icons/gi'
import './navbar.css'
import userEvent from '@testing-library/user-event'

const NavBar = (props) => {
  const activeTab = props.activeTab;
  const [active, setActive] = useState(0);


  {/* Nav bar has an upload option if the user is an artist */ }
  {/* Starts line 109 */ }
  const [isArtist, setIsArtist] = useState(true);

  return (
    <>
      <div className="Nav">

        {/* <Link className='trove-links' to={'/'}> */}
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
        {/* </Link> */}

        <div className='divider-white'></div>

        {/* <Link to={'/search'} className='trove-links'> */}
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
        {/* </Link> */}

        <div className='divider-white'></div>

        {/* <Link to={'/mytrove'} className='trove-links'> */}
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
        {/* </Link> */}

        <div className='divider-white'></div>

        {/* <Link to={'/myaccount'} className='trove-links'> */}
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
        {/* </Link> */}

        {/* Reads if the user is an artist or not. Right now this is hard coded. It won't be for long <3 */}
        <div className={isArtist === true ? '' : 'hidden'} id='divider-white'></div>{/*Yes there's a divider too*/}
        
        <div  className={isArtist === true ? '' : 'hidden'} >
          {/* <Link to={'/upload'} className='trove-links'> */}
            <div
              className={active === 4 ? "active" : ""}
              onClick={() => setActive(4)}
            >
              <h1 hidden>Upload (Artist)</h1>
              <div className="trove-nav-icon">
                <div className='nav-icon'>
                  <RiUpload2Line size={20}/>
                </div>
                <div className='nav-text '>
                  <p className='text-pad-t  '>Upload</p>
                </div>
                <div className="selection-indicator">
                </div>
              </div>
            </div>
          {/* </Link> */}
        </div>
        
      </div>
    </>
  )
}

export default NavBar