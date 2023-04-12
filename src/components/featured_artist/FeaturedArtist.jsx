import React from 'react'
import './FeaturedArtist.css'
import Popup from 'reactjs-popup'
import userEvent from '@testing-library/user-event'

const FeaturedArtist = ({ artist }) => {
  const artistin = artist
  const userIn = {
    name: 'Oath',
    artistListens: 526
  }
  return (
    <div className='featArtCont'>
        <div className='leftCont'>
        <div className='imgNameCont'>
        <div className='featArtImg'>
          <img src={artistin.imgUrl} />
        </div>
        <h1>{artistin.name}</h1>
      </div>

      <div className='userArtistListens'>
        {userIn.name}'s plays: <span>{userIn.artistListens}</span>
      </div>
        </div>
      

      <div className='artistBioCont'>
        <p className='artistBio'>{artistin.bio}</p>
        <Popup
          trigger={<button className='btn'> Show More </button>}
          modal
          closeOnDocumentClick
        >
          {close => (
            <div className='bioOnClickCont'>
              <div className='modalTitle'>
                {artistin.name}
                <span>'s Artist Bio </span>
                <button
                  onClick={() => {
                    close()
                  }}
                >
                  X
                </button>
              </div>
              <div className='bioContBio'>
                <span>{artistin.bio}</span>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  )
}

export default FeaturedArtist;
