
import './myaccount.css'

import React from 'react';
import MyAccountTabs from './MyAccountTabs';

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
                    <MyAccountTabs/>
                  </div>

              
         
          </div>

  )
}

export default MyAccount