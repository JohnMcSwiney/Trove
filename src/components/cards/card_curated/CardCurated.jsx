import React from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import './CardCurated.css'
 function CardCurated ({ id, name, artist, cover }) {
    const navigate = useNavigate()
    const redirectAlbum = () => {
      navigate(`/curated/${id}`)
    }
    return (
      <div className='curatedCardCont'>
        <div className='curatedPlaylistCard' onClick={redirectAlbum}>
        <div className='curatedPlaylistInfo'>
            <h3>{name}</h3>
          </div>
          <div className='curatedPlaylistCover'>
            <img src={cover} alt={name} />
          </div>
  
         
        </div>
      </div>
    )
  };
  
export default CardCurated