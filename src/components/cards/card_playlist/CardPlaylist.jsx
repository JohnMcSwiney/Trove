import React, { Component } from 'react'
import './CardPlaylist.css';

import playlistData from '../../../data/hardcodedTestData/hardcodePlaylists';
import AlbumPage from '../../../AlbumPage/AlbumPage.jsx';
import { Navigate, useNavigate, Link } from 'react-router-dom';





function CardArtist({props}){
  const navigate = useNavigate()
  const redirectPlaylist = () => {
    navigate('../PlaylistPage')
  }

    return(
      <>
        {
          playlistData.map((playlist, index)=>(
            <div onClick={redirectPlaylist}>
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
                    
                    <div className='plytxt'>
                    <a 
                      className='testingplaylisttext'>
                        {playlist.name} 
                        </a>
                    </div>
                    <div className='plyUntxt'>
                    <a 
                      className='text'>
                        {playlist.user_name} 
                        </a>
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