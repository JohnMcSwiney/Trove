import React, { Component } from 'react';
import artistTemp from './artistPicPlaceholder.png';
import PropTypes from 'prop-types';
import './CardArtist.css';
import placeholder from './artistPicPlaceholder.png';

import artistData from '../../../data/hardcodedTestData/hardcodeArtists.js';
import { Navigate, useNavigate, Link } from 'react-router-dom';

function CardArtist({ props }) {

  const navigate = useNavigate()
  const redirectArtist = () => {
    navigate('./Artist')
  }

  return (
    <>
      {
        artistData.map((artist, index) => (

          <div className='flex flex-col align-middle justify-center text-center text-ellipsis rounded p-2 m-0.5 artistCard-bg-fglass-1' 
                onClick={redirectArtist}>

            <div className='bg-transparent p-1 m-auto '>
              <div className='artistCard-border' >
                <div className='artistCard-img-cont'>
                  <img
                    className='artistCard-img'
                    src={artist.picUrl}
                    alt={artist.name} 
                    
                    />
                </div>
              </div>
            </div>
            <div className='artistCard-txt-container'>
              <a
                className=' artistCard-text hover:text-trv-White'>
                {artist.name}
              </a>
            </div>
          </div>
        ))
      }
    </>
  )

}
export default CardArtist;

