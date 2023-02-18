import React from 'react'
import { useLogin } from '../hooks/user-hooks/useLogin';

import Header from '../containers/header/Header';
import './login.css'
import { useNavigate } from 'react-router-dom';

import{ImFacebook, ImGoogle} from 'react-icons/im'
const Login = () => {
     const [email, setEmail] = React.useState('');
     const [password, setPassword] = React.useState('');
     const {login, error, isLoading} = useLogin();
     const navigate = useNavigate();
     const handleSubmit = async (e)=> {
          e.preventDefault();
          try{
               await login(email, password);
               setTimeout(()=>{
                    navigate('/');
               })
          }catch(err){
               console.log(err.data?.message|| 'Please try again');
          }
          
     }
  return (
     <div className='login'>
    <form onSubmit={handleSubmit}>
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

               <a href="/signup" 
               className="text-light" role="button" 
               ><button className="signupbtn">Sign up</button></a>
               </div>

          </div>
          {error && <div className="error">{error}</div>}
     </form>
          <div className='go-fa'>
               <p>Continue with</p>

          <div className='go-fa-wrap'>
                <div className='go'>
                    <ImGoogle className='go-icon'/>
               </div>

               <div className='fa' >
                    <ImFacebook className='fa-icon'/>
               </div>
          </div>
               
              
          </div>
     </div>
  )
}

export default Login