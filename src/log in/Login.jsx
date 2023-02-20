import React from 'react'
import { useLogin } from '../hooks/user-hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import './login.css';

//icons
import {BsGoogle, BsFacebook} from 'react-icons/bs'




const Login = () => {
     const [email, setEmail] = React.useState('');
     const [password, setPassword] = React.useState('');
     const {login, error, isLoading} = useLogin();

     const navigate = useNavigate();
     const handleSubmit = async (e)=> {
          e.preventDefault();
          try{
               await login(email, password);
             
          }catch(err){
               console.log(err.data?.message|| 'Please try again');
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
          <div>
               <p>Continue with</p>
               <BsGoogle/>
               <BsFacebook/>
               
          </div>
     </>
  )
}

export default Login