import React from 'react'
import {RiAccountCircleLine} from 'react-icons/ri'
import {CgPassword} from 'react-icons/cg'
import {FiHelpCircle} from 'react-icons/fi'
export  const minibarData = [
    {
        title:"Account",
        icon: <RiAccountCircleLine/>,
        url:"account",
    },

    {
        title:"Password",
        icon:<CgPassword/>,
        url:"password",
    },

    {
        title:"Help",
        icon:<FiHelpCircle/>,
        url:"help",
    }

]
