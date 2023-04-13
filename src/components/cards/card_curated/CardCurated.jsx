import React from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
 function CardCurated ({ id, name, artist, cover }) {
    const navigate = useNavigate()
    const redirectAlbum = () => {
      navigate(`/curated/${id}`)
    }
    return (
      <div className='bg-fglass border-w2'>
        <div className='searchAlbumCard' onClick={redirectAlbum}>
          <div className='searchAlbumCover'>
            <img src={cover} alt={name} />
          </div>
  
          <div className='searchAlbumInfo'>
            <h3>{name}</h3>
            <h4>{artist}</h4>
          </div>
        </div>
      </div>
    )
  };
  
export default CardCurated