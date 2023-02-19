import React from 'react'
import Axios from'axios';

import Header from '../containers/header/Header';
import './login.css'
import { useNavigate } from 'react-router-dom';

// import{ImFacebook, ImGoogle} from 'react-icons/im'
const Login = () => {
     const [email, setEmail] = React.useState('');
     const [isLoggedIn, setIsLoggedIn] = React.useState(false)
     const login = ()=> {
          Axios.post("http://127.0.0.1:8080/api/user/login", {email})
          .then(console.log('it worked'))
     }
  return (
     <div className='login'>
  
          <h1 className='login-header'>Log In & Sign Up with 1 Step</h1>
          
          <div className='login-container'>
               <div className='form-outline mb-4'>
                    <label className='form-label' for='emailbox'>Enter your Email:</label>
                    <input type="email" id='emailbox' className='form-control' onChange={(e)=>setEmail(e.target.value)}
                    />  
               </div>
               <div className='buttonCont'>
               <button
               className='loginbtn text-light' type='submit' onClick={login}>
                    Log in
               </button>
               </div>

          </div>
    
          {/* <div className='go-fa'>
               <p>Continue with</p>

          <div className='go-fa-wrap'>
                <div className='go'>
                    <ImGoogle className='go-icon'/>
               </div>

               <div className='fa' >
                    <ImFacebook className='fa-icon'/>
               </div>
          </div>
               
              
          </div> */}
     </div>
  )
}

export default Login