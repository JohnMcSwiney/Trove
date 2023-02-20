
import './myaccount.css'

import React from 'react';
import {BrowserRouter, Route, Routes, Outlet, NavLink} from 'react-router-dom'
import Minibar from './miniBar/Minibar';

const MyAccount = () => {
    const [img, setImg] = React.useState('./img/user-demo.png');
    const [displayName, setDisplayName] = React.useState('') //user.displayName
    const [changeEmail, setChangeEmail] = React.useState(''); //user.email
    const [changePassword, setChangePassword] = React.useState('')//user.password
  return (
          <div className='my-account-page'>
                  <h1> Account Settings</h1>
                  <p>Chage your profile and account settings</p>
                  <div className='my-account-wrap'>
                    <Minibar/>
                  </div>

              {/* <div className='my-account-wrap'>
                  <h1>Account Settings</h1>
                  
                  <form className=''>
                   <div className=''>
                   <img src={img} alt="user-image"  className='user-img' onChange={(e)=> setImg(e.target.value)} value={img}/>
                    <label htmlFor='displayName' className='label-tag'>Display Name</label>
                    <input type='text'  id='displayName' className='form' onChange={(e)=> setDisplayName(e.target.value)} value={displayName} />

                    <label htmlFor='email' className='label-tag'>Email</label>
                    <input type='text' id='email'  className='form' onChange={(e)=> setChangeEmail(e.target.value)} value= {changeEmail}/>
                    
                    <label htmlFor='email' className='label-tag'>password</label>
                    <input type='password' id='password'  className='form' onChange={(e)=> setChangePassword(e.target.value)} value= {changePassword}/>
                    <button className='savebtn btn btn-primary' type='submit'>Save</button>
                    </div>
                  </form>
                </div> */}
            <Outlet/>
          </div>

  )
}

export default MyAccount