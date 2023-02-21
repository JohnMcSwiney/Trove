import React from "react"

// Playlist's Song Component
export default function PlaylistSong(props) {
    const [likedSong, setLikedSong] = React.useState('../assets/heart.png');

    function handleLike() {

        if (likedSong === '../assets/heart.png') {
            setLikedSong('../assets/likedHeart.png')
        } else {
            setLikedSong('../assets/heart.png')
        }

    }
 
    return (
        <div className="playlist--song">
                <div className="playlist--tiny--cover">
                        <img src={props.cover} alt="playlistcover"/>
                </div>                
                <div className="playlist--song--info">
                        <h5>{props.title}</h5>
                        <h6>{props.artist}</h6>
                        <h5><span>{props.duration}</span></h5>
                       
                </div>
                <div className="playlist--song--options">
                        <img src={likedSong} id="playlist--song--heart" alt="heart" onClick={ () =>  handleLike()} />
                        <img src="../assets/share.png" id="playlist--song--share" alt="share"/>
                        <img src="../assets/more.png" id="playlist--song--more" alt="more"/>
                </div>           

            </div>

    )
}