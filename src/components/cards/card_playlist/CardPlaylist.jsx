import React, { Component } from 'react'
import './CardPlaylist.css';

import playlistData from '../../../hardcodedTestData/hardcodePlaylists'

function CardArtist({props}){

    return(
      <>
        {
          playlistData.map((playlist, index)=>(
            <div>
              <div className='contPlaylist'>
                   <div className='rounded-md m-auto  '>
                     <div className='overflow-hidden' > 
                       <img 
                          className='playlist-img' 
                          src={playlist.picUrl} 
                          alt={playlist.name}
                          />
                     </div>
                   </div>

                   <div className='plytxtcont'>
                    
                    <a 
                      className='plytxt text'>
                        {playlist.name} 
                        </a>
                    
                      
                        <a 
                      className='plyUntxt text'>
                        {playlist.user_name} 
                        </a>
                        <div className='plybotcol'>

                        </div>
                    </div>
                </div>
            </div>
            
          ))
        }
      </>
    )
     
}
export default CardArtist;