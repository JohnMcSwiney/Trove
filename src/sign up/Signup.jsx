// import { ErrorResponse } from '@remix-run/router';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/user-hooks/useSignup';

// import { userSignup } from '../services/api';

import './signup.css'
export default function Signup() {
     const [email, setEmail] = React.useState('');
     const [password, setPassword] = React.useState('');
     const [conPassword,setConPassword] = React.useState('');

    
     const checkPassword = password === conPassword ? true: false;
     const {signup,error,isLoading} = useSignup();
     const navigate = useNavigate();
     console.log(error);
     const handleSubmit = async (e)=> {
          e.preventDefault();
          try{
               await signup(email, password);
               setTimeout(()=>{
                    navigate('/');
               })
          }catch(err){
               console.log(err.data?.message|| 'Please try again')
          }
          
     }
     
  return (
    <form className='signup' onSubmit={handleSubmit}>
          <h1 className='signup-header'>Sign up</h1>
               
               <div className='signup-container'>
                    <div className='form-outline mb-4'>
                         <label className='form-label' for='emailbox'>Email</label>
                         <input type="email" id='emailbox' className='form-control'
                         onChange={(e)=>setEmail(e.target.value)} value={email}
                         />
                         
                    </div>

                    <div className='form-outline mb-4'>
                         <label className='form-label' for='passwordbox'>Password</label>
                         <input type="password" id='passwordbox' className='form-control' 
                         onChange={(e)=>setPassword(e.target.value)} value = {password}
                         />
                         
                    </div>

                    <div className='form-outline mb-4'>
                         <label className='form-label' for='Cpasswordbox'>Confirm Password</label>
                         <input type="password" id='Cpasswordbox' className='form-control'
                         onChange={(e)=>setConPassword(e.target.value)} value = {conPassword}
                         />      
                    </div>

               <button disabled={isLoading&&checkPassword}  className='signupbtn-form btn mb-4 text-white' type='submit'>Sign up</button>
               </div>
               {error && <div className='error'>{error}</div>}
              
               
     </form>
  )
}


