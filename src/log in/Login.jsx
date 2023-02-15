import React from 'react'
import './login.css'


const Login = () => {
     const [email, setEmail] = React.useState('');
     const [password, setPassword] = React.useState('');

     const handleSubmit = async (e)=> {
          e.preventDefault();
          console.log(email,password)
     }
  return (
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

               <div class="row mb-4">

                    <div class="col">
                         <a href="#!">Forgot password?</a>
                    </div>
               </div>
     
               <button className='loginbtn-form btn mb-4 text-light' type='submit'>Log in</button>
               <a href="/signup" class="signupbtn-form btn text-light" role="button" style={{borderColor:"#8650f4", borderRadius: "5px"}}>Sign up</a>
          </div>
     </form>
  )
}

export default Login