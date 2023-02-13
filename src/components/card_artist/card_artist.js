import React, { Component } from 'react'
import artistTemp from '../../components/your artist/artistTemp.jpg';

export default class card_artist extends Component {
    render() {
        const artistName = "Paul McCartney";
    return (
        <div className='flex flex-col align-middle justify-center text-center text-ellipsis w-24 bg-pink-700 rounded p-1 m-2'>
        <div className='rounded-full bg-gradient-to-t from-trv-Purple to-trv-Blue p-2 m-auto'>
          <div className='overflow-hidden' >
            <img src={artistTemp} className='rounded-full w-14'/>
          </div>
        </div>
        <h2>{artistName}</h2>
      </div>
    )
  }
}
