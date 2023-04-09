import { useState, useEffect } from 'react'
import React from 'react'
import TasteProfile from '../../components/taste Profile/TasteProfile'
import CardArtist from '../../components/cards/card_artist/CardArtist'
import CardAlbum from '../../components/cards/card_album/CardAlbum'
import CardDiscovery from '../../components/cards/card_discoverygame/CardDiscovery'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import './home.css'
import { useAuthContext } from '../../hooks/user-hooks/useAuthContext'
import LoadingSearch from '../../components/loadingitems/loadingSearch/LoadingSearch'

import Slider from 'react-slick'
import CardCarousel from '../../components/cards/card_carousel/CardCarousel'
const Home = () => {
  const navigate = useNavigate()
  const redirectDiscovery = () => {
    navigate('/discoverygame')
  }
  const userID = JSON.parse(localStorage.getItem('user'))
  const id = userID ? userID.id : null
  const [done, setDone] = React.useState(true)
  // const favoriteArtists = JSON.parse(localStorage.getItem("user")).likedArtists;
  // console.log(favoriteArtists);

  const [userInfo, setUserInfo] = useState([])
  const [curatedPlaylist, updateCurated] = useState([]);

  if(curatedPlaylist.length === 0){
    const fetchCurated = async () => {
      setDone(false)
      setTimeout(() => {
        fetch(`api/curated/`)
        .then(response => response.json())
          .then(json => {
            console.log(json)
            updateCurated(json)
            setDone(true)
          })
      }, 500)
    }
  }
   

  useEffect(() => {
    const fetchUserInfo = async () => {
      setDone(false)
      setTimeout(() => {
        fetch(`/api/users/${id}`)
          .then(response => response.json())
          .then(json => {
            setUserInfo(json)
            setDone(true)
          })
      }, 500)
    }
  })

  const settings = {
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: false,
    infinite: true,
    className: 'test',
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    cssEase: 'ease',
    dots: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    // dotsClass:"carousel-dots"
    // pauseOnDotsHover: true,
    // centerMode: true,
    // centerPadding: '-1vw',
    // focusOnSelect: true
  }
if(curatedPlaylist.length !== 0 ){
  console.log(curatedPlaylist)
}
console.log(curatedPlaylist)
  return (
    // <div className=' '>
    <main className='container '>
      <div>
        {/* <h4 className='text-invisible'>...</h4> */}
        <div className='homeShowcase'>
          <Slider {...settings}>
            <CardCarousel title={'Our Daily Mixtape'} imgUrl={'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'}></CardCarousel>
            <CardCarousel title={'Rock On!'} imgUrl={'https://images.unsplash.com/photo-1499415479124-43c32433a620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80'}></CardCarousel>
            <CardCarousel title={'Only on TroveMusic'} imgUrl={'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'}></CardCarousel>
            <CardCarousel title={'Ever wanted to be an artist?'} imgUrl={'https://images.unsplash.com/photo-1508898578281-774ac4893c0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'}></CardCarousel>
          </Slider>
          <div className='carousel-dots'> ... </div>
        </div>
      </div>

      <div>
        <h4 className='homeHeaderText'>Find Musical Treasures</h4>
        <div
          href={'/discoverygame'}
          className='my-3'
          onClick={redirectDiscovery}
        >
          <CardDiscovery />
        </div>
      </div>

      {userInfo?.likedArtists?.length > 0 && (
        <div>
          <h4 className=' homeHeaderText '>Artists you love:</h4>
          {!done ? (
            <LoadingSearch />
          ) : (
            <div>
              {userInfo?.likedArtists?.length > 0 &&
                userInfo?.likedArtists.map(artist => {
                  return (
                    <div className='art-card-cont' key={artist._id}>
                      <CardArtist artist={artist} />
                    </div>
                  )
                })}
            </div>
          )}
        </div>
      )}

      <h4 className='homeHeaderText'>Suggested Albums:</h4>
      <div className='grid grid-flow-col overflow-scroll '>
        <CardAlbum />
      </div>
    </main>
    // </div>
  )
}

export default Home
