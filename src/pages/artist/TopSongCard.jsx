import React from 'react'
import { MdTitle } from 'react-icons/md'
import AddToQueueBtn from '../../components/QueueBtns/addToQueueBtn'
export default function TopSongCard (data) {
  if (data.index > 4) {
    return (
        <div></div>
    )
  }

  return (
    <div className='topSongCardCont'>
      <div className='topSongIndexCont'>{data?.index + 1}</div>
      <div className='topSongimgCont'>
        <img src={data?.cover}></img>
      </div>
      <div className='topSongTxtCont'>
        <div className='topSongTitleCont'>{data?.name}</div>
        
      </div>
      <div className='queueBtnBox'><AddToQueueBtn song={data?.song}/></div>
    </div>
  )
}
