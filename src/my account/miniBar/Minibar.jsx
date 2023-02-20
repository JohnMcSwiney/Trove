import React from 'react'
import './minibar.css'
import { minibarData } from './minibarData'
import { Link, Outlet } from 'react-router-dom'
const Minibar = () => {
    return (
            <div className='miniSidebar'>
                
                {minibarData.map((val, key)=> {
                    return (
                        <button className='btn btnLink' key={key} >
                            <Link to={val.url} className='minibar-item'>
                            <div className='minibar-icon'>{val.icon}</div>
                            <div className='minibar-title'>{val.title}</div>
                            </Link>
                        </button>
                    )
                })}
                
                <Outlet/>
            </div>
          )
}

export default Minibar