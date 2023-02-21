import React from 'react'
import { useLogin } from '../hooks/user-hooks/useLogin';
import { Navigate, useNavigate } from 'react-router-dom';
import './login.css';

import {BsGoogle, BsFacebook} from 'react-icons/bs'
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";


const Login = () => {
     const [email, setEmail] = React.useState('');
     const [password, setPassword] = React.useState('');
     const {login, error, isLoading} = useLogin();
     const[isLoggedIn, setIsLoggedIn] =React.useState(false)
     const navigate = useNavigate();

     const handleSubmit = async (e)=> {
          e.preventDefault();
          try{
               await login(email, password);
               if(localStorage.getItem("user")){
                    navigate('/')
               }

          }catch(err){
               console.log(err.data?.message|| 'Please try again');
               return;
          }
               
          
     }

    
  return (
     <>
    <form className='login' onSubmit={handleSubmit}>
          <h1 className='login-header'>Log in</h1>
          
          <div className='login-container'>
               <div className='form-outline mb-4'>
                    <label className='form-label' for='emailbox'>Email</label>
                    <input type="email" id='emailbox' className='form-control' onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    />
                    
               </div>

               <div className='form-outline mb-4'>
                    <label className='form-label' for='passwordbox'>Password</label>
                    <input type="password" id='passwordbox' className='form-control' onChange={(e)=>setPassword(e.target.value)}
                     value = {password}
                     />
               </div>

               <div className="row mb-4">

                    <div className="col">
                         <a href="#!">Forgot password?</a>
                    </div>
               </div>


               <div className='buttonCont'>
               <button disabled={isLoading} 
               className='loginbtn text-light' type='submit'>
                    Log in
               </button>
               </div>

          </div>
          {error && <div className="error">{error}</div>}
     </form>   
               <div className='buttonCont'>
                    <a href="/signup" 
                    className="text-light" role="button" 
                    ><button className="signupbtn">Sign up</button></a>
               </div>

                    <div className='go-fa-div'>
                         <p>Continue with</p>
                         <div className='go-fa-wrap'>
                              <div className='go'><BsGoogle className='go-icon'/></div>
                              <div className='fa'><BsFacebook className='fa-icon'/></div>
                    </div>
                    {/* <LoginSocialGoogle
                    client_id={"client-id"}
                    scope="openid profile email"
                    discoveryDocs="claims_supported"
                    access_type="offline"
                    onResolve={({ provider, data }) => {
                         console.log(provider, data);
                    }}
                    onReject={(err) => {
                         console.log(err);
                    }}
                    >
                    <GoogleLoginButton />
                    </LoginSocialGoogle> */}
               </div>
     </>
  )
}

export default Login