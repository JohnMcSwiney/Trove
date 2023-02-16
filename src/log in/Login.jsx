import React from 'react'
import {useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

import './login.css'


const Login = () => {
     const [email, setEmail] = React.useState('');
     const [password, setPassword] = React.useState('');
     const {login, error, isLoading, isLogedIn} = useLogin();

     const navigate = useNavigate();

     const handleSubmit = async (e)=> {
          e.preventDefault();
          const success =await login(email, password);
         
          if(!error && !isLoading){
               navigate('/');
          }
     }
  return (
    <form className='login' onSubmit={handleSubmit}>
          <h1 className='login-header'>Log in</h1>
          
          <div className='login-container'>
               <div className='form-outline mb-4'>
                    <label className='form-label' htmlFor='emailbox'>Email</label>
                    <input type="email" id='emailbox' className='form-control' onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    />
                    
               </div>

               <div className='form-outline mb-4'>
                    <label className='form-label' htmlFor='passwordbox'>Password</label>
                    <input type="password" id='passwordbox' className='form-control' onChange={(e)=>setPassword(e.target.value)}
                     value = {password}
                     />
               </div>

               <div class="row mb-4">

                    <div class="col">
                         <a href="#!">Forgot password?</a>
                    </div>
               </div>
     
               <button disabled={isLoading} className='loginbtn-form btn mb-4 text-light' type='submit'>
                    Log in
               </button>
               <a href="/signup" class="signupbtn-lform btn text-light" role="button" style={{borderColor:"#8650f4", borderRadius: "5px"}}>Sign up</a>
          </div>
          {error && <div className="error">{error}</div>}
          
     </form>
  )
}

export default Login