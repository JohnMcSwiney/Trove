import React from 'react'
import artistTemp from './artistTemp.jpg'
const YourArtists = () => {
  return (
    <div>
        <h4 className="font-bold mt-4 pb-2 text-sm box-border pl-3 text-trv-White">Artists you love:</h4>
          <div className='grid grid-flow-col overflow-scroll '>
            {/* <artistTemp /> */}

            <div className='flex flex-col align-middle justify-center text-center text-ellipsis w-24 rounded p-1 m-2'>
              <div className='rounded-full bg-gradient-to-t from-trv-Purple to-trv-Blue p-1.5 m-auto'>
                <div className='overflow-hidden' >
                  <img src={artistTemp} className='rounded-full w-14' />
                </div>
              </div>
              <h2 className='text-trv-sm-Artist-txt text-sm pt-1'>Artist Name</h2>
            </div>


          </div>
    </div>
  )
}

export default YourArtists