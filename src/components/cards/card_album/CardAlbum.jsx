import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './CardAlbum.css';

import albumData from '../../../data/hardcodedTestData/hardcodeAlbums'
import { Navigate, useNavigate, Link } from 'react-router-dom';





function CardAlbum({props}){
  const navigate = useNavigate()
  const redirectAlbum = () => {
    navigate('./AlbumPage')
  }
    return(
      <>
        {
          albumData.map((album, index)=>(
            <div className='bg mx-3 flex flex-col align-middle 
                            justify-center text-center text-ellipsis w-24 rounded-lg 
                            overflow-hidden cont 
                            '
                            onClick={redirectAlbum}>
                   <div className='rounded-md m-auto  '>
                     <div className='overflow-hidden p-0.5 ' > 
                       <img 
                          className='rounded-md w-full overflow-hidden 
                                     object-cover h-full' 
                          src={album.picUrl} 
                          alt={album.name}
                          />
                     </div>
                   </div>

                   <div className='grid grid-flow-row gap-0 h-14 align-middle m-auto'>
                      <a 
                      className='albtxt text'>
                        {album.name} 
                        </a>
                        <a 
                      className='arttxt text'>
                        {album.artist} 
                        </a>
                    </div>
                   </div>
          ))
        }
      </>
    )
     
}
export default CardAlbum;