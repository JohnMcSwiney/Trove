import React from 'react'
import {RiFolderMusicLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import MusicBar from '../music bar/MusicBar'

import {AiOutlineHome} from'react-icons/ai'  //for home icon
import {GoSearch} from 'react-icons/go'

import {VscAccount} from 'react-icons/vsc'
import {GiOpenTreasureChest} from 'react-icons/gi'
import './navbar.css'
const NavBar = () => {
  return (
    <>
      
    <div className='trove-navbar'>
        <div className="Nav">
       

        <Link className='trove-links nav-link' to={'/'}>
        <div className="trovelinks">
        
        <div className="trove-nav-icon">
          <AiOutlineHome/> 
          <p>Home</p>
        </div>
        </div>

        </Link>
        

        <Link to={'/search'} className='trove-links nav-link'>  
        <div className="trovelinks">
          <div className="trove-nav-icon">
            <GoSearch/>
            <p>Search</p>
          </div>
        </div>
        
        </Link>

    
        <Link  to={'/mytrove'} className='trove-links nav-link'>
        <div className="trovelinks">
          

          <div className="trove-nav-icon">
            <GiOpenTreasureChest/>
            <p>My Trove</p>
          </div>
        </div>
        
        </Link>

        <Link  to={'/myaccount'} className='trove-links nav-link'>
        <div className="trovelinks">
        
        
          <div className="trove-nav-icon">
            <VscAccount/>
            <p>Account</p>
          </div>
        </div>
        
        </Link>
    

    </div>
  </div>
  </>
  )
}

export default NavBar