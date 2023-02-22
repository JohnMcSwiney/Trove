
import './myaccount.css'

import React from 'react';
import {Alert} from "@mui/material"
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
    const userinfo = localStorage.getItem("user") !== null
    
   
  
  return (
      
          <div>
              <h1>Settings</h1>
          </div>

              
  )
}

export default MyAccount