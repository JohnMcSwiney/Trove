import React, { Component } from 'react'
import artistTemp from './artistPicPlaceholder.png';
import PropTypes from 'prop-types';
import './CardArtist.css'

import artistData from '../../hardcodeArtists'
function CardArtist({ props }) {


  return (
    <>
      {
        artistData.map((artist, index) => (

          <div className='flex flex-col align-middle justify-center text-center text-ellipsis w-24 rounded p-0.5 m-0.5 shadow-md bg-fglass-1' >

            <div className='bg-transparent p-1 m-auto '>
              <div className='overflow-hidden borderTest' >
                <img
                  className='rounded-full w-14 overflow-hidden object-cover h-14 '
                  src={artist.picUrl}
                  alt={artist.name} />
              </div>
            </div>
            <div className='flex h-12 align-middle m-auto '>
              <a
                className='txt-container text flex flex-wrap h-12 overflow-hidden text-center m-auto items-center justify-center  hover:text-trv-White'>
                {artist.name}
              </a>
            </div>
          </div>
        ))
      }</>


  )

}
export default CardArtist;

