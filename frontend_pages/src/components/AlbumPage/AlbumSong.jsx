import React from "react"

// Album's Song Component
export default function AlbumSong(props) {
    const [likedSong, setLikedSong] = React.useState('../assets/heart.png');

    function handleLike() {

        if (likedSong === '../assets/heart.png') {
            setLikedSong('../assets/likedHeart.png')
        } else {
            setLikedSong('../assets/heart.png')
        }

    }
 
    return (
        <div className="album--song">
                <div className="album--tiny--cover">
                        <img src={props.cover} alt="albumcover"/>
                </div>                
                <div className="album--song--info">
                        <h5>{props.title}</h5>
                        <h6>{props.artist}</h6>
                        <h5><span>{props.duration}</span></h5>
                       
                </div>
                <div className="album--song--options">
                        <img src={likedSong} id="album--song--heart" alt="heart" onClick={ () =>  handleLike()} />
                        <img src="../assets/share.png" id="album--song--share" alt="share"/>
                        <img src="../assets/more.png" id="album--song--more" alt="more"/>
                </div>           

            </div>

    )
}