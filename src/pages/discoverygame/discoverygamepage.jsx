import React from 'react'

import DiscoveryGame from '../../components/discoverygame/DiscoveryGame'
import DiscoveryGame2 from '../../components/discoverygame/DiscoveryGame2'

import './discoverygamestyle.css';

export default function discoverygamepage() {
  return (
    <div className='dg-page'>
      {/* <div className='dg2-CardContainer'> */}
        <DiscoveryGame/>
    </div>
  )
}
