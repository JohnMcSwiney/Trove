import React from 'react'
import recordAsset from './recordAsset.png'
import './CardGenre.css'

const GenreCard = ({ index, color, name, percent }) => {
  const genreName = name
  const style = {
    backgroundColor: color
  }
  const textStyle = {
    color: color
  }
  const percentage = percent
  return (
    <div className={'top'+index+'card'}>
      <div
        className='
        genreCardCont
        '
      >
        <div className='genreFiller'></div>
        <div className='recordCont' style={style}>
          <img src={recordAsset} className='recordItem' />
          {/* <div className="genreSticker" style={style}></div> */}
          {/* <div className="recordCenter"></div> */}
        </div>
        <div className='genreNameCont'>{genreName}</div>
        <div className='genrePercent'>
          {Math.round(percent)}
          {'%'}
        </div>
       
      </div>
      <h1
      style={textStyle}
      >#{index}</h1> 
    </div>
  )
}

export default GenreCard;
