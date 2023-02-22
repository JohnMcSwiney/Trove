
import './myaccount.css'

import React from 'react';
import {Alert} from "@mui/material"
const MyAccount = () => {

  const options = [
    { 
      header: {
        name: "Account"
      },
      values: [
        { 
        name: "Profile",
        description: "Your email address is your identity on this app and is used to log in.",
        tags:[
          "Email",
          "Display name",
          "Date of birth",
          "Your image"
        ]
        }]
    },

    {
      header : {
        name: "Privacy"
      },

      values:[
        {
          name: "Password && Email",
          description: "Change your password and email",
          tags: [
            "Current password",
            "New Passwordw",
            "Current Email",
            "New Email",

          ]
        }
      ]

    },
    {
      header : {
        name: "Support"
      },

      values:[
        {
          name: "Help",
          description: "Having trouble ?",
          tags:[],
        },

        {
          name: "FAQ",
          description: "View our frequently asked questions",
          tags: []
        },

        {
          name: "Contact us",
          description: "Contact our support team, offer limited to premium users",
          tags: []
        },

        {
          name: "Report an issue",
          description: "Reports whats not working well, so we can fix it",
          tags: []
        }
      ]
    }
  ]
      
    const [visibleOptions, setVisibleOptions] = React.useState(options)

    const onChangeHandle = (e)=> {
      e.preventDefault();

      const value = e.target.value;
      
      
      if( value.trim().length ===0){
        setVisibleOptions(options);
        return;
      }
      const returnItems = []

      visibleOptions.forEach((option, index)=> { 

          const foundOptions = option.values.filter(item=>{


            return item.name.toLowerCase().search(value.trim().toLowerCase()) !== -1 || item.description.toLowerCase().search(value.trim().toLowerCase()) !==-1
          });

          returnItems[index] = {
            header:{
              name:option.header.name,
            },

            values:foundOptions

          };

          if(option.header.name.toLowerCase().search(value.trim().toLowerCase())!==-1){
            returnItems[index] = {
              header:{
                name:option.header.name,
              },
  
              values:options[index].values
  
            };
          }
      });

      setVisibleOptions(returnItems)
    };
    const userinfo = localStorage.getItem("user") !== null
  
  return (
      <>
          {userinfo ? (
          <div className='my-account-page'>
                 <div className="container my-5">
                    <h1>Setting</h1>
                    <input type='text' className='form-control mt-5' placeholder='Search' onChange={onChangeHandle} />


                    <div>
                {visibleOptions.map((val)=> {
                  return (
                    <div key={val.header.name} className='mt-5 mt-2'>
                      <h3>{val.header.name}</h3>

                      <div>
                        {val.values.map((value)=> {
                          return(
                            <div key={value.name}>
                             <ul className='list-group'>
                              <li className='list-group-item mb-2'>
                                <h6 className='font-weight-bold'>{value.name}</h6>
                                <p>{value.description}</p>
                              </li>
                            </ul> 
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
                 </div>

             
          </div>): (<Alert severity="warning" className='alertBox'>Login Required</Alert>)}
          </>
  )
}

export default MyAccount