
import './myaccount.css'

import React from 'react';


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
          description: "Change your password",
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
  return (
          <div className='my-account-page'>
                 <div className="container my-5">
                    <h1>Setting</h1>
                    <input type='text' className='form-control' placeholder='Search' />
                 </div>

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
                                <h6>{value.name}</h6>
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

  )
}

export default MyAccount