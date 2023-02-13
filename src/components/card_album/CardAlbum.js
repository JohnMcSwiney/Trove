import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './style.css';


function CardArtist(props){
  let picUrl = props.picUrl;  
  let name = props.name;
    return(
      <div className='bg mx-3 hover:drop-shadow-2xl flex flex-col align-middle justify-center text-center text-ellipsis w-24 rounded-lg shadow-md overflow-hidden  '>
                   <div className='rounded-md m-auto  '>
                     <div className='overflow-hidden p-0.5 ' > 
                       <img 
                          className='rounded-md w-full overflow-hidden object-cover h-full ' 
                          src={props.album.picUrl} 
                          alt={props.album.name}
                          />
                     </div>
                   </div>

                   <div className='grid grid-flow-row gap-0 h-14 align-middle m-auto'>
                      <a 
                      className='albtxt'>
                        {props.album.name} 
                        </a>
                        <a 
                      className='arttxt'>
                        {props.album.artist} 
                        </a>
                    </div>
                   </div>
    )
     
}
export default CardArtist;