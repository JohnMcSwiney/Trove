import React, { Component } from 'react'
import './CardPlaylist.css';

import playlistData from '../../hardcodePlaylists'

function CardArtist({props}){

    return(
      <>
        {
          playlistData.map((playlist, index)=>(
            <div>
              <div className='cont '>
                   <div className='rounded-md m-auto  '>
                     <div className='overflow-hidden p-0.5 ' > 
                       <img 
                          className='playlist-img' 
                          src={playlist.picUrl} 
                          alt={playlist.name}
                          />
                     </div>
                   </div>

                   <div className='grid grid-flow-row gap-0 h-14 align-middle m-auto'>
                      <a 
                      className='albtxt text'>
                        {playlist.name} 
                        </a>
                        <a 
                      className='arttxt text'>
                        {playlist.artist} 
                        </a>
                    </div>
                </div>
            </div>
            
          ))
        }
      </>
    )
     
}
export default CardArtist;