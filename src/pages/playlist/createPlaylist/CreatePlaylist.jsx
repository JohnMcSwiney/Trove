import React from 'react'

import './CreatePlaylist.css'
import albumsongs from '../../../data/albumsongs.json'
import PlaylistSong from './PlaylistSong'
import PopUp from './Popup'

import firebase from './firebaseConfig'

import { useCreatePlaylist } from '../../../hooks/user-hooks/useCreatePlaylist'

import { FiUpload } from 'react-icons/fi'
import { Navigate, useNavigate, Link } from "react-router-dom";

// To create a playlist
export default function CreatePlaylist (props) {
  //search
  const [songs, setSongs] = React.useState(null)
  const [songData, setSongData] = React.useState(null)
  const [search, setSearch] = React.useState('')
  const [searchResult, setSearchResult] = React.useState({})
  const [done, setDone] = React.useState(true)

  const searchAPI = React.useEffect(() => {
    const fetchSearch = async () => {
      if (search == '') {
        setDone(true)
        return
      } else {
        setDone(false)
        setTimeout(() => {
          fetch(`/api/search/${search}`)
            .then(response => response.json())
            .then(json => {
              setSearchResult(json)
              setDone(true)
            })
        }, 500)
      }
    }
    fetchSearch()
  }, [search])

  // user id
  const user = localStorage.getItem('user')
  const id = JSON.parse(user).id

  //playlist val states
  const default_album = '../../assets/default_playlistcover.png'
  const addSongImg = '../../assets/addsongsymbol.png'
  const removeSongImg = '../../assets/xsongsymbol.png'
  const [previewCover, setPreviewCover] = React.useState(default_album)
  const [albumSongs, setAlbumSongs] = React.useState(albumsongs)
  const [playlistSongList, setPlaylistSongList] = React.useState([])
  const [songList, setSongList] = React.useState([])

  const [playlistName, setPlaylistName] = React.useState('')
  const [imageFile, setImageFile] = React.useState()

  //handle changes
  const handleImageFileChange = e => {
    setImageFile(e.target.files[0])
    setPreviewCover(URL.createObjectURL(e.target.files[0]))
  }

  const handlePlaylistName = e => {
    setPlaylistName(e.target.value)
  }

  // remove song from playlist creation
  function handleRemoveSong (song, songAction) {
    console.log(song._id)

    if (songAction === 'remove') {
      const newList = playlistSongList.filter(item => item._id !== song._id)
      const newSongList = songList.filter(item => item !== song._id)

      setPlaylistSongList(newList)
      setSongList(newSongList)

      console.log('DEL SONG' + songList)
    } else if (songAction === 'add') {
      setPlaylistSongList(prevPlaylistSongs => [...prevPlaylistSongs, song])
      setSongList(prevSongList => [...prevSongList, song._id])
      console.log('ADD SONG ' + songList)
    }
  }

  // modal popup state
  const [modalIsOpen, setIsOpen] = React.useState(false)

  function togglePop () {
    setIsOpen(prevModalIsOpen => !prevModalIsOpen)
    console.log('OPENED!')
  }

  // submit playlist
  const navigate = useNavigate();
  const { uploadPlaylist, error } = useCreatePlaylist()
  const handleSubmit = async e => {
    console.log('CLICKED SUBMIT')
    // e.preventDefault();

    try {
      await uploadPlaylist(playlistName, id, imageFile, songList);
    } catch (error) {
      console.log(error)
    }
    
    if(uploadPlaylist){
      navigate(`/mytrove`);
      // console.log(uploadPlaylist)
    }
    
  }
  
  return (
    <section className='playlist-containter-ver2'>
      {/* PLAYLIST'S INFO */}
      {modalIsOpen ? <div className='createplaylist--popupmask'></div> : null}
      {modalIsOpen ? (
        <PopUp
          togglePop={togglePop}
          albumSongs={albumSongs}
          songActionImg={addSongImg}
          handleRemoveSong={handleRemoveSong}
          search={search}
          setSearch={setSearch}
          done={done}
          setSongData={setSongData}
          searchResult={searchResult}
          songAction={'add'}
        />
      ) : null}
      {/* playlistInfo */}
      <div className='bg-fglass--1--playlist'>
        <div className='playlist--info'>
          <div className='createplaylist--song--cover'>
            <img src={previewCover} alt='playlist' />
            <label className='createplaylist--custom-file-upload'>
              <input
                type='file'
                name='cover'
                value=''
                accept='image/*'
                className='createplaylist--gradient--btn createplaylist--image--btn createplaylist--hide--file'
                onChange={handleImageFileChange}
              />
              Choose Image
              <FiUpload id='upload--icon' />
              {/* <img
                src="../../assets/upload_icon.png"
                id="upload--icon"
                alt="upload_icon"
              /> */}
            </label>
          </div>

          <div className='createplaylist--stats--info'>
            <input
              type='text'
              className='playlistTitleInp'
              placeholder='Playlist Name'
              onChange={handlePlaylistName}
            />

            {/* <input type="text" id="playlisttitle" placeholder="Playlist Name" onChange={handlePlaylistName} /> */}
            <div className='createplaylist--release--info'>
              {/* <h5>2014</h5> */}
              {/* <h6>PLAYLIST</h6> */}
            </div>
            {/* <h4>Creator Username</h4> */}
          </div>
        </div>
        <div className='createplaylist--addsongs'>
          {/* <input type="text" id="searchbar" placeholder="Search Songs"/> */}

          <input
            type='button'
            value='Add Songs'
            // className='createplaylist--gradient--btn createplaylist--addsongsbtn'
            className='createPlaylist--addSongsBtnVer2 btn'
            onClick={togglePop}
          />
        </div>
      
          <input
            type='submit'
            value='Create'
            className='createplaylist--gradient--btn createplaylist--submit--btn'
            onClick={handleSubmit}
          />
      </div>

      <div className='bg-fglass--2--playlist'>
        <div className='playlist--songs'>
          <ul className='playlist--songlist--container'>
            {playlistSongList &&
              playlistSongList.map((item, index) => {
                return (
                  <li className='playlist--song--container'>
                    <h1>{index + 1}</h1>
                    <PlaylistSong
                      key={index}
                      {...item}
                      song={item}
                      index={index}
                      handleRemoveSong={handleRemoveSong}
                      songActionImg={removeSongImg}
                      songAction={'remove'}
                    />
                  </li>
                )
              })}
          </ul>
        </div>

        {/* addSongs */}
      </div>
    </section>
  )
}
