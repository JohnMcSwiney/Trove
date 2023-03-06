import React from "react"

// Create Playlist's Song Component
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
        <div className="createplaylist--song">
                <div className="createplaylist--delsong">
                    <img src="../assets/xsongsymbol.png" alt="deletesongicon" onClick={ () =>  props.handleRemoveSong(props.idno)} />
                </div>
                <div className="createplaylist--tiny--cover">
                        <img src={props.cover} alt="playlistcover"/>
                        <img src='../assets/playmask.png' id="playmask" alt="albumcover"/>
                </div>                
                <div className="createplaylist--song--info">
                        <h5>{props.title}</h5>
                        <h6>{props.artist}</h6>
                        <h5><span>{props.duration}</span></h5>
                       
                </div>
                <div className="createplaylist--song--options">
                        <img src={likedSong} id="playlist--song--heart" alt="heart" onClick={ () =>  handleLike()} />
                        <img src="../assets/share.png" id="playlist--song--share" alt="share"/>
                        <img src="../assets/more.png" id="playlist--song--more" alt="more"/>
                </div>           

            </div>

    )
}