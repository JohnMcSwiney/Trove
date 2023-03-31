import React from 'react'
import { MdTitle } from 'react-icons/md'
export default function TopSongCard (data) {
  if (data.index > 4) {
    return (
        <div></div>
    )
  }

  return (
    <div className='topSongCardCont'>
      <div className='topSongIndexCont'>{data?.index}</div>
      <div className='topSongimgCont'>
        <img src={data?.cover}></img>
      </div>
      <div className='topSongTxtCont'>
        <div className='topSongTitleCont'>{data?.name}</div>
        <div></div>
      </div>
    </div>
  )
}
