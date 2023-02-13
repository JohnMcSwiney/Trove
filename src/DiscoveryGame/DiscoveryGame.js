

import ReactAudioPlayer from 'react-audio-player';
import './DiscoveryGame.css'
import React from 'react';
import { useSwipeable } from 'react-swipeable';
import AudioPlayer from '../AudioPlayer/AudioPlayer';


 


const DiscoveryGame = () => {
  const [index, setIndex] = React.useState(0);
  const [accept, setAccept] = React.useState(0);
  const [deny, setDeny] = React.useState(0);
   
  const slides = [
    {
      url: require('../imgs/Reflection.jpg'),
      alt: 'Image 1',
      header: 'Reflection',
      audio: require('../mp3/Reflection.mp3'),
      startTime: ('59'),
    },
    {
      url: require('../imgs/Resurrections.jpg'),
      alt: 'Image 2',
      header: 'Resurrections',
      audio: require('../mp3/Resurrections.mp3'),
      startTime: ('20'),
    },
    {
      url: require('../imgs/Farewell.jpg'),
      alt: 'Image 3',
      header: 'Farewell',
      audio: require('../mp3/Farewell.mp3'),
      startTime: ('45'),
    },
    {
      url: require('../imgs/Farewell.jpg'),
      alt: 'Image 3',
      header: 'Discovery Game Song List Done',
      audio: require('../mp3/Farewell.mp3'),
      startTime: ('30'),
    },
  ];

  const swipeableProps = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () => {
      if (index === slides.length - 1) return;
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setAccept(accept + 1);
    },
    onSwipedRight: () => {
      if (index === slides.length - 1) return;
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setDeny(deny + 1);
    },
  });
  
  return (
    <div className="div">
      <div className='container' {...swipeableProps}>
        
        
        <h2 className="SongName">{slides[index].header}</h2>


        <div className="Redux">
          <img src={slides[index].url} alt={slides[index].alt} className="trove__mp_img"/>
          

          <button onClick={() => {if (index === slides.length - 1) return;
          setIndex((prevIndex) => (prevIndex + 1) % slides.length);
          setDeny(deny + 1);
          }} className='Swipe-right'>Swipe right</button>


          <button onClick={() => {if (index === slides.length - 1) return;
          setIndex((prevIndex) => (prevIndex + 1) % slides.length);
          setAccept(accept + 1);
          }} className='Swipe-Left'>Swipe left</button>
        
        </div>
        
        <ReactAudioPlayer src={slides[index].audio} className="SongDuration" autoPlay controls defaultCurrentTime={slides[index].startTime}/>
        <button onClick={() => {
        if (index === 0) return;
        setIndex((prevIndex) => (prevIndex + slides.length - 1) % slides.length);
        }}>Previous</button>
      
      </div>
      <div className="show-number">{accept}Left swipes </div>
      <br/>
      <div className="show-number">{deny}Right swipes</div>
    </div>
  );
};

//<AudioPlayer className="SongDuration"/> soon to replace ReactAudioPlayer



//setDeny(deny + 1); for the previous button
export default DiscoveryGame;

