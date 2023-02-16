import React from 'react'
import { useLogin } from '../hooks/useLogin';
<<<<<<< HEAD
import Header from '../containers/header/Header';
=======
>>>>>>> parent of 6d506e53 (redirecting works for login, signup now)
import './login.css'


const Login = () => {
     const [email, setEmail] = React.useState('');
     const [password, setPassword] = React.useState('');
     const {login, error, isLoading} = useLogin();
     
     const handleSubmit = async (e)=> {
          e.preventDefault();
          
          await login(email, password);
          
          
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
<<<<<<< HEAD

               <div className='buttonCont'>
               <button disabled={isLoading} 
               className='loginbtn text-light' type='submit'>
                    Log in
               </button>

               <a href="/signup" 
               className="text-light" role="button" 
               ><button className="signupbtn">Sign up</button></a>
               </div>
               
=======
     
               <button disabled={isLoading} className='loginbtn-form btn mb-4 text-light' type='submit'>Log in</button>
               <a href="/signup" class="signupbtn-form btn text-light" role="button" style={{borderColor:"#8650f4", borderRadius: "5px"}}>Sign up</a>
>>>>>>> parent of 6d506e53 (redirecting works for login, signup now)
          </div>
          {error && <div className="error">{error}</div>}
     </form>
  )
}

export default Login