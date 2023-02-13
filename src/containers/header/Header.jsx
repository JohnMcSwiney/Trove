import React from 'react'
import { FiSettings } from "react-icons/fi"
const Header = () => {
  return (
    <header className='headerBg py-2 pt-2 w-full my-auto sticky top-0 z-50'>
        <div className='flex flex-row py-2.5 m-auto justify-between mx-2'>
          <div className=' text-trv-White bg-trv-sm-Play-bg p-4 h-5 w-5 flex rounded-full shadow-md' ><FiSettings className='relative' size={20} /> </div>
          <div className='flex text-trv-White my-auto h-8 bg-pink-400 px-2 rounded mobileNav drop-shadow-md'>
            <h1 className='font-bold text-lg'>Trove</h1><h2 className='text-lg'>Music</h2>
          </div>
          <div className='relative text-trv-White bg-gradient-to-t from-trv-Purple to-trv-Blue p-4 h-5 w-5 flex rounded-full flex-row justify-center shadow-md'>
            
            <div className='absolute bg-yellow-500 p-3 w-5 h-5 rounded-full inset-x-1 inset-y-1'></div>
            {/* <FaUserCircle/> */}
          </div>
        </div>
      </header>
  )
}

export default Header