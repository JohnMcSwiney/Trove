
import './myaccount.css'

import React from 'react';
import './UserAccStyle.css';
import tempImg from './temp-imgs/derek.png';
import CardPlaylist from '../components/card_playlist/CardPlaylist';

const userFollowers = 124;
const MyAccount = () => {
    const [img, setImg] = React.useState('./img/user-demo.png');
    const [displayName, setDisplayName] = React.useState('') //user.displayName
    const [changeEmail, setChangeEmail] = React.useState(''); //user.email
    const [changePassword, setChangePassword] = React.useState('')//user.password
  return (
    <>
    <form className='myAccount'>

      <div className='myAccount-wrap'>
        <img src={img} alt="user-image"  className='user-img' onChange={(e)=> setImg(e.target.value)} value={img}/>
        </div>

        <div className='form-div'>
        <label htmlFor='displayName' className='label-tag'>Display Name</label>
        <input type='text'  id='displayName' className='form' onChange={(e)=> setDisplayName(e.target.value)} value={displayName} />

        <label htmlFor='email' className='label-tag'>Email</label>
        <input type='text' id='email'  className='form' onChange={(e)=> setChangeEmail(e.target.value)} value= {changeEmail}/>
        
        <label htmlFor='email' className='label-tag'>password</label>
        <input type='password' id='password'  className='form' onChange={(e)=> setChangePassword(e.target.value)} value= {changePassword}/>
        <button className='btn btn-primary' type='submit'>Update</button>
        </div>

       
    </form>

    <div className='container'>
      <div className='pfp_name_follower_cont'>
        <div className='borderuserimg'>
            <img src={tempImg} className='user-img'></img>
        </div>
        <div className='name_follower_cont'>
          <div className='txt-container'>
              <h1>Oath</h1>
          </div>
          <div className='follower_cont'>
            <div>
            <h2>{userFollowers}</h2><h1>Followers</h1>
            </div>
            <button>Follow</button>
          </div>
          
        </div>
        
      </div>
      <div className='account-splitter'></div>
      <div className='account-showcase'>
        <h1>Created Playlists:</h1>
        <div className='CardCont'>
          <CardPlaylist/>
        </div>
      </div>
      <div className='account-splitter'></div>
      <div className='account-showcase'>
        <h1>Top Genre(s):</h1>
      </div>
      
      
    </div>
    </>
  )
}

export default MyAccount