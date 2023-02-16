import React from 'react'
import {useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import Header from '../containers/header/Header';
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
     <Header headerTxt={["Trove", "Music"]} 
              displayBack={0}
              displayHamburger={0}
              displayTitle={1}/>
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

               <a href="/signup" 
               className="text-light" role="button" 
               ><button className="signupbtn">Sign up</button></a>
               </div>
               
          </div>
          {error && <div className="error">{error}</div>}
          
     </form>
  )
}

export default Login