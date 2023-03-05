import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './CardAlbum.css';

import albumData from '../../../data/hardcodedTestData/hardcodeAlbums'
import { Navigate, useNavigate, Link } from 'react-router-dom';





function CardAlbum({props}){
  const navigate = useNavigate()
  const redirectAlbum = () => {
    navigate('./AlbumPage')
  }
    return(
      <>
        {
          albumData.map((album, index)=>(
            <div className='bg card-alb-cont 
                            '
                            onClick={redirectAlbum}>
                   <div className='card-alb-img-cont'>
                       <img 
                          className='' 
                          src={album.picUrl} 
                          alt={album.name}
                          />
                   </div>

                   <div className='card-alb-text-cont'>
                      <a 
                      className='albtxt alb-card-text'>
                        {album.name} 
                        </a>
                        <a 
                      className='arttxt alb-card-text'>
                        {album.artist} 
                        </a>
                    </div>
                   </div>
          ))
        }
      </>
    )
     
}
export default CardAlbum;