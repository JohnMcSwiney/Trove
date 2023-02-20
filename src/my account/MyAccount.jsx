import React from 'react'
import './myaccount.css'
const MyAccount = () => {
    const [img, setImg] = React.useState('./img/user-demo.png');
    const [displayName, setDisplayName] = React.useState('') //user.displayName
    const [changeEmail, setChangeEmail] = React.useState(''); //user.email
    const [changePassword, setChangePassword] = React.useState('')//user.password
  return (
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
  )
}

export default MyAccount