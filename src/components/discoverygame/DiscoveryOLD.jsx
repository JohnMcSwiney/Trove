


// Discovery Content

<div className='Discovery-Container'>
      
<div
// className='Discovery-Top-Container'
>
  {/* Back button - plays song just swipped  */}

  {/* <button
    className="hidden"
    onClick={() => {
      if (state === 0) return;
      setIndex(
        (prevIndex) => (prevIndex + slides.length - 1) % slides.length
      );
    }}
  >
    <BiArrowToLeft />
  </button> */}

  {/* volume */}
  <div className='DGvolumeContainter'>
    <button onClick={toggleMute}>
      {isMuted ? <BiVolumeFull /> : <BiVolumeMute />}
    </button>
    <input
      type='range'
      ref={DGvolumeRef}
      defaultValue='10'
      onChange={changeVolumeLevel}
      min='0'
      max='100'
      step='5'
    ></input>
  </div>

  <div className='Discovery-Top-Container'>
    <Slider ref={musicSlides} {...settings} id='carousel'>   
      {dGData?.map((song, i = 0) => {
        return (
          <div className="test2">
            <div className="Discovery-Img-Container">
              <img
                src={song?.imgUrl}
                className="DGimg"
                onClick={() => printIndex(i++)}
              />
            </div>
          </div>
        );
      })}
   
    </Slider>
  </div>
  {/* img updates every second, change later */}
</div>
<div className='Discovery-Text-Container'>
  {/* Song title */}
  <h2 className='DGsongtxt'>
    {/* {dGData && dGData[state].title}  */}
    {/* {dGData && (
      dGData[state]?.title)}  */}
      title
  </h2>
  {/* Song Artist */}
  <h2 className='DGalbtxt'>
    {/* {dGData && (
      dGData[state]?.artist.artistName)}  */}
      artist
  </h2>
</div>
{/* Swipe Box */}
<div className='Discovery-Swipe-Container' {...swipeableProps}>
  {/* dislike */}
  <button
    onClick={() => {
      handleSwipe2('click dislike')
      // if (state === slides.length - 1) return;
      // setIndex((prevIndex) => (prevIndex + 1) % slides.length);
      // setDeny(deny + 1);
      // dislikedIds.push(
      //   slides[state]._id,
      //   slides[state].title,
      //   slides[state].artist
      // );
      // gotoNext();
      // setState(state + 1);
    }}
    className='Discovery-Disike'
  >
    <BsXLg />
  </button>
  <div className='DGarrowcont'>
    <MdOutlineArrowBackIos className='DGarrow' />
    <MdOutlineArrowBackIos />
    <MdOutlineArrowBackIos />
  </div>
  <div className='DGarrowcont'>
    {' '}
    <MdOutlineArrowForwardIos />
    <MdOutlineArrowForwardIos />
    <MdOutlineArrowForwardIos />{' '}
  </div>

  {/* like */}
  <button
    onClick={() => {
      handleSwipe2('click like')
      // if (state === slides.length - 1) return;
      // setIndex((prevIndex) => (prevIndex + 1) % slides.length);
      // setAccept(accept + 1);
      // console.log(slides[state].id);
      // likedIds.push(
      //   slides[state]._id,
      //   slides[state].title,
      //   slides[state].artist
      // );
      // gotoNext();
      // setState(state + 1);
      // handleAddLikedSongs();
    }}
    className='Discovery-Like'
  >
    <BsCheckLg />
  </button>
</div>
{/*Audio Player*/}
<div className='Discovery-Player-Container'>
  {/* <div className={style.DGaudioPlayer}>  JACK */}
  <div className=''>
    <audio
      ref={audioPlayer}
      src={dGData[state]?.songUrl}
      autoPlay = {isLoaded}
      //
      preload='metadata'
      onLoadedMetadata={
        (setIsLoaded(true))
      }
      isPlaying={
        (animationRef.current = requestAnimationFrame(whilePlaying))
      }
    ></audio>
    {/*testing maybe going in audio player to fix not loading the proggress bar on start up onLoadedMetaData={onLoadedMetaData}  */}

    {/*current time*/}
    {/* removed for testing */}
    {/* <div className={style.DGcurrentTime}>{calculateTime(currentTime)}</div> */}
    {/*progress bar*/}
    <div className='DGprogressBarContainer'>
      <input
        type='range'
        // className={style.DGprogressBar}
        className='DGprogressBar'
        defaultValue='0'
        ref={DGprogressBar}
        onChange={() => {
          changeRange()
          animationRef.current = requestAnimationFrame(whilePlaying)
        }}
      />
    </div>
    {/*Duration*/}
    {/* removed for testing*/}
    {/* <div className={style.DGduration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div> */}
    <div className='DGpsbutsCont'>
      <button
        onClick={togglePlayPause}
        className='DGplayPause'
        id='playPauseBtn'
      >
        {isPlaying ? <FaPause /> : <FaPlay className='DGplay' />}
      </button>
    </div>
  </div>
</div>{' '}
{/* Audio Player End */}
{/* 
<div className="Discovery-TestingItem-Container">
  Like
  <div>{accept} [ Likes ]</div>
  Dislike
  <div>{deny} [ Dislikes ]</div>

  <div>
    <button
      onClick={() => {
        console.log(
          "Liked ids:" + likedIds + " | " + "Disliked ids:" + dislikedIds
        );
      }}
    >
      {" "}
      View Likes & Dislikes
    </button>

    
  </div>
</div> 
*/}
</div>