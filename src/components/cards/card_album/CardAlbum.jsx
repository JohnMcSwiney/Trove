import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './CardAlbum.css';

import albumData from '../../../hardcodedTestData/hardcodeAlbums'

function CardArtist({props}){

    return(
      <>
        {
          albumData.map((album, index)=>(
            <div className='bg mx-3 flex flex-col align-middle 
                            justify-center text-center text-ellipsis w-24 rounded-lg 
                            overflow-hidden cont '>
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
export default CardArtist;