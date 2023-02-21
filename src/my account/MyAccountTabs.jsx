import { useState } from 'react'
import React from 'react'
import './tab.css'


const MyAccountTabs = () => {
   
    const [state, setState] = useState(1);

    // const user = localStorage.getItem("user")
    // const [name, setName] = useState(user.displayName)
    // const [changePassword, setChangePassword] = useState();
    // const [changeEmail, setChangeEmail] = useState(user.email)
    const action =  (index)=> {
        setState(index)
    }
   return(
        <>
        <div className='box'>
            <div className='tabs'>
                <h5 className={`${state===1?`tab active-tab`:`tab` }`} onClick={()=>action(1)}>
                    Account
                </h5>

                <h5 className={`${state===2?`tab active-tab`:`tab` }`} onClick={()=>action(2)}>
                    Privacy
                </h5>

                <h5 className={`${state===3?`tab active-tab`:`tab` }`} onClick={()=>action(3)}>
                    Support
                </h5>

            </div>

            <div className='contents'>
            <div className={`${state===1? "content active-content" : 'content'}`}>
                    <form className='form-group'>
                    <h4>General profile settings</h4>
                        <div className='inner-form'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' placeholder="" id='name' className='form-control'/>
                            
                            <label htmlFor='gmail'>Email</label>
                            <input type='email' placeholder="" id='email' className='form-control' />
                        </div>

                        <button className='btn btn-success'>Update</button>
                    </form>
                
            </div>

            <div className={`${state===2? "content active-content" : 'content'}`}>
                    <form className='form-group'>
                    <h4>Privacy Settings</h4>
                        <div className='inner-form'>
                            <label htmlFor='curPassword'>Current Password</label>
                            <input type='text' placeholder="" id='curPassword' className='form-control'/>
                            
                            <label htmlFor='password'>Password</label>
                            <input type='email' placeholder="" id='password' className='form-control' />
                        </div>

                        <button className='btn btn-success'>Update</button>
                    </form>
             
            </div>


            <div className={`${state===3? "content active-content" : 'content'}`}>
                <h1>Content 3</h1>
                <p> This is content 3</p>
            </div>

        </div>
        </div>

        
        </>
   )
}

export default MyAccountTabs