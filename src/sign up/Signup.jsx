// import { ErrorResponse } from '@remix-run/router';
import React from 'react';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
// import { userSignup } from '../services/api';

import './signup.css'
export default function Signup() {
     const [email, setEmail] = React.useState('');
     const [password, setPassword] = React.useState('');
     const [conPassword,setConPassword] = React.useState('');

    
     const checkPassword = password === conPassword ? true: false;
     const {signup,error,isLoading} = useSignup();
     const navigate = useNavigate();
     
     const handleSubmit = async (e)=> {
          e.preventDefault();
          await signup(email, password);
          if(!error && !isLoading){
               navigate('/');
          }
     }

     //axios method
     // const handleSubmit = async(e) =>{
     //      e.preventDefault();
     //      // await signup(email, password) 
     //      try {
     //           const result = await userSignup({
     //                email: email,
     //                password: password
     //           })
     //           console.log('result',result)
     //      } catch (err) {
     //           console.log('signup is err', ErrorResponse)
     //      }
     // }
  return (
    <form className='signup' onSubmit={handleSubmit}>
          <h1 className='signup-header'>Sign up</h1>
               
               <div className='signup-container'>
                    <div className='form-outline mb-4'>
                         <label className='form-label' htmlFor='emailbox'>Email</label>
                         <input type="email" id='emailbox' className='form-control'
                         onChange={(e)=>setEmail(e.target.value)} value={email}
                         />
                         
                    </div>

                    <div className='form-outline mb-4'>
                         <label className='form-label' htmlFor='passwordbox'>Password</label>
                         <input type="password" id='passwordbox' className='form-control' 
                         onChange={(e)=>setPassword(e.target.value)} value = {password}
                         />
                         
                    </div>

                    <div className='form-outline mb-4'>
                         <label className='form-label' htmlFor='Cpasswordbox'>Confirm Password</label>
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


