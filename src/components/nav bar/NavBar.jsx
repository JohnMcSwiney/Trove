import React from 'react'
import {RiFolderMusicLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import MusicBar from '../music bar/MusicBar'
import './navbar.css'
const NavBar = () => {
  return (
    <>
      
    <div className='trove-navbar'>
        <div className="Nav">
        {/* Bot Nav */}

        <Link to={'/'}>
        <div className="trove-links">
        
        <div className=" ">Home</div>
        </div>

        </Link>
        

        <Link to={'/search'}>  
        <div className="trove-links">
        
        <div className="">Search</div>
        </div>
        
        </Link>

    
        <Link  to={'/mytrove'}>
        <div className="trove-links">
        
        <div className="">My Trove</div>
        </div>
        
        </Link>

        <Link  to={'/myaccount'}>
        <div className="trove-links">
        
        <div className="">Account</div>
        </div>
        
        </Link>
    

    </div>
  </div>
  </>
  )
}

export default NavBar