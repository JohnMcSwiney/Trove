import React, { Component } from 'react'
import artistTemp from './artistPicPlaceholder.png';
import PropTypes from 'prop-types';
import './test.css'

import artistData from '../../hardcode'
function CardArtist({props}){

  
    return(
      <>
      {
            artistData.map((artist, index)=>(
            
              <div className='flex flex-col align-middle justify-center text-center text-ellipsis w-24 rounded p-1 m-0.5 shadow-md '>

              <div className='rounded-full bg-gradient-to-t from-trv-Purple to-trv-Blue p-1.5 m-auto hover:drop-shadow-2xl'>
            <div className='overflow-hidden  ' > 
              <img 
                className='rounded-full w-14 overflow-hidden object-cover h-14 ' 
                src={artist.picUrl} 
                alt={artist.name}/>
            </div>
          </div>
          <div className='flex h-12 align-middle m-auto '>
            <a 
            className='atest flex flex-wrap h-12 overflow-hidden text-trv-sm-Artist-txt text-center m-auto items-center justify-center  hover:text-trv-White'>
              {artist.name} 
              </a>
          </div>
          </div>
            ))
          }</>
          
        
    )
     
}
export default CardArtist;

