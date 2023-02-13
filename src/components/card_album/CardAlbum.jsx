import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './style.css';

import albumData from '../../hardcode2'

function CardArtist({props}){

    return(
      <>
        {
          albumData.map((album, index)=>(
            <div className='bg mx-3 hover:drop-shadow-2xl flex flex-col align-middle justify-center text-center text-ellipsis w-24 rounded-lg shadow-md overflow-hidden  '>
                   <div className='rounded-md m-auto  '>
                     <div className='overflow-hidden p-0.5 ' > 
                       <img 
                          className='rounded-md w-full overflow-hidden object-cover h-full ' 
                          src={album.picUrl} 
                          alt={album.name}
                          />
                     </div>
                   </div>

                   <div className='grid grid-flow-row gap-0 h-14 align-middle m-auto'>
                      <a 
                      className='albtxt'>
                        {album.name} 
                        </a>
                        <a 
                      className='arttxt'>
                        {album.artist} 
                        </a>
                    </div>
                   </div>
          ))
        }
      </>
    )
     
}
export default CardArtist;