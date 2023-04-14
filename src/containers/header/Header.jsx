import React, { useEffect } from 'react'
import './header.css'
import { useLogout } from '../../hooks/user-hooks/useLogout'
import { useAuthContext } from '../../hooks/user-hooks/useAuthContext'

import { Dropdown, ButtonGroup } from 'react-bootstrap'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineUser } from 'react-icons/ai'
import { RiUser5Line } from 'react-icons/ri' //for signup
import { RiLoginBoxLine, RiLogoutBoxLine, RiUpload2Line } from 'react-icons/ri' // login out , upload
import { MdKeyboardBackspace } from 'react-icons/md' //back button
import { Link, useNavigate } from 'react-router-dom'

function Header () {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const userData = JSON.parse(localStorage.getItem('user'))
  const logoutHandler = () => {
    logout()
  }

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  //responsive
  const [logo, setLogo] = React.useState(window.innerWidth < 800)
  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setLogo(window.innerWidth < 800)
    })
  })
  // console.log(window.screen.width);
  return (
    <div className='trove-header d-flex justify-content-between sticky-top bg-fglass-b'>
      {logo ? (
        <button className='backBtn-container' onClick={goBack}>
          <MdKeyboardBackspace className='titleback-icon' />
        </button>
      ) : (
        <div className=' p-2'>
          <Link className='trove-logo-link navbar-brand' to={'/'}>
            <img
              src='./img/troveIcon.png'
              alt='Trove logo'
              className='trove-logo hidden'
            />
            <h1 className='trove-logo-link'>
              <span className='span'>Trove</span> Music
            </h1>
          </Link>
        </div>
      )}
      {logo && (
        <div className=' p-2'>
          <Link className='trove-logo-link navbar-brand' to={'/'}>
            <img
              src='./img/troveIcon.png'
              alt='Trove logo'
              className='trove-logo hidden'
            />
            <h1 className='trove-logo-link'>
              <span className='span'>Trove</span> Music
            </h1>
          </Link>
        </div>
      )}

      <div className='p-2'>
        {logo && (
          <Dropdown 
          >
            <Dropdown.Toggle
              id='dropdown-basic'
              style={{ backgroundColor: '#393bd0' }}
            >
              {/* work on this to get the id */}
              {user && <div>{user._id}</div>}
              {/* I removed the user name from the dropdown */}
              {user ? <div></div> : <AiOutlineUser />}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ backgroundColor: '#393bd0' }}>
              {user && logo && (
                <div className='dd-backg'>
                  <RiLogoutBoxLine style={{ color: 'white' }} />
                  <button
                    className='logout btn text-light'
                    onClick={logoutHandler}
                  >
                    Log out
                  </button>
                </div>
              )}

              {!user && (
                <>
                  <div className='dd-backg'>
                    <RiUser5Line style={{ color: 'white' }} />
                    <a href='/signup' class='signupbtn-nav btn text-light'>
                      {' '}
                      Sign up
                    </a>
                  </div>

                  <div className='dd-backg'>
                    <RiLoginBoxLine style={{ color: 'white' }} />
                    <a href='/login ' className='loginbtn-nav btn text-light'>
                      Log in
                    </a>
                  </div>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  )
}

export default Header
