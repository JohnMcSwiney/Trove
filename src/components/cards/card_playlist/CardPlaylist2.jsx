import React from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import './CardPlaylist2.css'
 function CardPlaylist2 ({ id, name, artist, cover }) {
    const navigate = useNavigate()
    const redirectAlbum = () => {
      navigate(`/playlist/${id}`)
    }
    return (
      <div className='playlistCardCont2'>
        <div className='playlistCard2' onClick={redirectAlbum}>
        <div className='playlistInfo2'>
            <h3>{name}</h3>
          </div>
          <div className='playlistCover2'>
            <img src={cover} alt={name} />
          </div>
  
         
        </div>
      </div>
    )
  };
  
export default CardPlaylist2