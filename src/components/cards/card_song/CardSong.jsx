import {React, useState} from 'react'

export default function CardSong(props) {
    const [isLiked, setIsLiked] = useState(false)


    const toggleLiked = () => {
        setIsLiked(!isLiked)
      }
 
    return (
        <div className="album--song">
                <div className="album--tiny--cover">
                        <img src={props.cover} alt="albumcover"/>
                        <img src='../assets/playmask.png' id="playmask" alt="albumcover"/>
                </div>                
                <div className="album--song--info">
                        <h5>{props.title}</h5>
                        <h6>{props.artist}</h6>
                        <h5><span>{props.duration}</span></h5>
                       
                </div>
                <div className="album--song--options">
                        
                        <img src="../assets/share.png" id="album--song--share" alt="share"/>
                        <img src="../assets/more.png" id="album--song--more" alt="more"/>
                </div>           

            </div>

    )
}
