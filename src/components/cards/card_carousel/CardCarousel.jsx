import React from 'react';
import './CardCarousel.css';
export default function CardCarousel(title) {
    let titleIn = title
    // console.log(titleIn)
    return (
    <div className='carousel-card-cont'>
        <img src={title.imgUrl}></img>
        <h2>{title.title}</h2>
    </div>
  )
}
