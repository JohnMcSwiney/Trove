import React from 'react'
import './searchEPCard.css'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
export default function SearchEPCard ({ id, name, artist, cover }) {
  const navigate = useNavigate()
  const redirectEp = () => {
    navigate(`/EpPage/${id}`)
  }
  return (
    <div className='bg-fglass border-w2'>
      <div className='searchAlbumCard' onClick={redirectEp}>
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
}
