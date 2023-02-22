
import './myaccount.css'

import React from 'react';
import { Alert } from "@mui/material"
const MyAccount = () => {

  // const options = [
  //   { 
  //     index:1,
  //     header: {
  //       name: "Account"
  //     },
  //     values: [
  //       { 
  //       name: "Profile",
  //       description: "Your email address is your identity on this app and is used to log in.",
  //       tags:[
  //         "Email",
  //         "Display name",
  //         "Date of birth",
  //         "Your image"
  //       ]
  //       }]
  //   },

  //   {
  //     index:2,
  //     header : {
  //     name: "Privacy"
  //     },

  //     values:[
  //       {
  //         name: "Password && Email",
  //         description: "Change your password and email",
  //         tags: [
  //           "Current password",
  //           "New Passwordw",
  //           "Current Email",
  //           "New Email",

  //         ]
  //       }
  //     ]

  //   },
  //   {
  //     index:3,
  //     header : {
  //     name: "Support"
  //     },

  //     values:[
  //       {
  //         name: "Help",
  //         description: "Having trouble ?",
  //         tags:[],
  //       },

  //       {
  //         name: "FAQ",
  //         description: "View our frequently asked questions",
  //         tags: []
  //       },

  //       {
  //         name: "Contact us",
  //         description: "Contact our support team, offer limited to premium users",
  //         tags: []
  //       },

  //       {
  //         name: "Report an issue",
  //         description: "Reports whats not working well, so we can fix it",
  //         tags: []
  //       }
  //     ]
  //   }
  // ]

  //   const [visibleOptions, setVisibleOptions] = React.useState(options)

  //   const onChangeHandle = (e)=> {
  //     e.preventDefault();

  //     const value = e.target.value;


  //     if( value.trim().length ===0){
  //       setVisibleOptions(options);
  //       return;
  //     }
  //     const returnItems = []

  //     visibleOptions.forEach((option, index)=> { 

  //         const foundOptions = option.values.filter(item=>{


  //           return item.name.toLowerCase().search(value.trim().toLowerCase()) !== -1 || item.description.toLowerCase().search(value.trim().toLowerCase()) !==-1
  //         });

  //         returnItems[index] = {
  //           header:{
  //             name:option.header.name,
  //           },

  //           values:foundOptions

  //         };

  //         if(option.header.name.toLowerCase().search(value.trim().toLowerCase())!==-1){
  //           returnItems[index] = {
  //             header:{
  //               name:option.header.name,
  //             },

  //             values:options[index].values

  //           };
  //         }
  //     });

  //     setVisibleOptions(returnItems)
  //   };
  // const userinfo = localStorage.getItem("user") !== null

  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  }

  const toggleExpanded2 = () => {
    setExpanded2(!expanded2);
  }

  const toggleExpanded3 = () => {
    setExpanded3(!expanded3);
  }

  // const user = localStorage.getItem("user")

  const [imgPath, setImagePath] = React.useState("./img/user-demo.png")
  return (

    <div className='container'>
      <h1>Settings</h1>

      <div className='tabs mt-5'>
        <div className='account-tab'>

          <div className='account-display' onClick={toggleExpanded}>
            <h3 className='account-header'>Account</h3>
            <p className='acount-summary'>Detail about your personal information</p>
          </div>

          <div className='acccount-content '  >
          {expanded && (
            
              <form>
                <img src={imgPath} className='user-avatar' alt="your-avatar" />

                <label htmlFor='email'>Email</label>
                {/* <input type='email' id='email' className='form-control' defaultValue={user.email} /> */}
                <input type='email' id='email' className='form-control' />
                <label htmlFor='name'>Display name</label>
                {/* <input type='text' id='name' className='form-control' defaultValue={user.displayName} /> */}

                <input type='text' id='name' className='form-control' />
                <label htmlFor="dob">Date of birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  // value={dob}
                  // onChange={handleDobChange}
                  className='form-control'
                />

                <label htmlFor='name'>Display name</label>
                {/* <input type='text' id='name' className='form-control' defaultValue={user.displayName} /> */}
                <input type='text' id='name' className='form-control' />
                <button className='btn btn-primary mt-3'>Save</button>
              </form>

            
          )}
          </div>
        </div>

        {/* 
                <div className='privacy-tab'>

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
 */}


      </div>
    </div>


  )
}

export default MyAccount