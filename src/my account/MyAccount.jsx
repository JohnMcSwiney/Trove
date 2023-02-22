
import './myaccount.css'

import React from 'react';
import {Alert} from "@mui/material"
const MyAccount = () => {

    const  [expanded, setExpanded] = React.useState(false);
    const  [expanded2, setExpanded2] = React.useState(false);
    const  [expanded3, setExpanded3] = React.useState(false);

    const toggleExpanded =()=> {
      setExpanded(!expanded);
      setExpanded2(false);
      setExpanded3(false);
    }

    const toggleExpanded2 =()=> {
      setExpanded2(!expanded2);
      setExpanded(false);
      setExpanded3(false);
    }

    const toggleExpanded3 =()=> {
      setExpanded3(!expanded3);
      setExpanded(false);
      setExpanded3(false);
    }
    
    const user = localStorage.getItem("user")
    const userinfo = localStorage.getItem("user") !== null

    const [imgPath, setImagePath] = React.useState("./img/user-demo.png")
  return (
      
          <div className='container' >
              <h1>Settings</h1>

              <div className='tabs mt-5'> 
                <div className='account-tab '>

                      <div className='account-display' onClick={toggleExpanded}> 
                      <h3 className='account-header'>Account</h3>
                      <p className='acount-summary'>Detail about your personal information</p>
                      </div>


                      {expanded &&(
                        
                        <form className='account-tab'>
                        
                        <div className='inner-form container'>
                        <div className='user-img-div'>
                        <img src={imgPath} className='user-avatar' alt="your-avatar" />
                        </div>

                        <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' className='form-control' defaultValue={user.email} />

                        <label htmlFor='name'>Display name</label>
                        <input type='text' id='name' className='form-control' defaultValue={user.displayName} />
                        <label htmlFor="dob">Date of birth:</label>
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          // value={dob}
                          // onChange={handleDobChange}
                          className='form-control'
                        />
                  
                        <button className='btn btn-primary mt-3'>Save</button>
                        </div>
                        </div>
                        </form>

                  
                      )}
                </div>


                <div className='privacy-tab container'>

                      <div className='privacy-display mt-3' onClick={toggleExpanded2}>
                      <h3 className='privacy-header'>Privacy</h3>
                      <p className='privacy-summary'>Detail about your personal account information</p>
                      </div>
                      
                      {expanded2 &&(
                         <div className='privacy-content'  >
                         <form>
                         
                       
                         <label htmlFor='email'>Current Email</label>
                         <input type='email' id='email' className='form-control' defaultValue={user.email} />
 
                         <label htmlFor='newemail'>New email</label>
                         <input type='email' id='newemail' className='form-control' defaultValue={user.email} />
 
                         <label htmlFor='password'>CurrentPassword</label>
                         <input type='password' id='name' className='form-control' defaultValue={user.displayName} />
 
                         <label htmlFor='newpassword'>New password</label>
                         <input type='password' id='newpassword' className='form-control' defaultValue={user.displayName} />
 
 
                         <button className='btn btn-primary mt-3'>Update</button>
                         </form>
 
                       </div>
                      )}
                </div>     


                <div className='support-tab container'>

                      <div className='privacy-display mt-3' onClick={toggleExpanded2}>
                      <h3 className='privacy-header'>Privacy</h3>
                      <p className='privacy-summary'>Detail about your personal account information</p>
                      </div>
                      
                      {expanded2 &&(
                         <div className='privacy-content'  >
                         <form>
                         
                       
                         <label htmlFor='email'>Current Email</label>
                         <input type='email' id='email' className='form-control' defaultValue={user.email} />
 
                         <label htmlFor='newemail'>New email</label>
                         <input type='email' id='newemail' className='form-control' defaultValue={user.email} />
 
                         <label htmlFor='password'>CurrentPassword</label>
                         <input type='password' id='name' className='form-control' defaultValue={user.displayName} />
 
                         <label htmlFor='newpassword'>New password</label>
                         <input type='password' id='newpassword' className='form-control' defaultValue={user.displayName} />
 
 
                         <button className='btn btn-primary mt-3'>Update</button>
                         </form>
 
                       </div>
                      )}
                </div>  



              </div>
          </div>

              
  )
}

export default MyAccount