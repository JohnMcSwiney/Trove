import React from "react"

// Create Playlist's Song Component
export default function PlaylistSong(props) {
    const [likedSong, setLikedSong] = React.useState('../assets/heart.png');

    function handleLike() {

        if (likedSong === '../assets/heart.png') {
            setLikedSong('../assets/likedHeart.png')
            console.log(props.song);
        } else {
            setLikedSong('../assets/heart.png')
        }

    }
    
    console.log(props.song);
    return (
        <div className="updateplaylist--song">
                <div className="updateplaylist--delsong">
                    <img src={props.songActionImg} alt="deletesongicon" onClick={ () =>  props.handleRemoveSong(props.song, props.songAction)} />
                </div>
                <div className="updateplaylist--tiny--cover">
                        <img src={props.song.imgUrl} alt="playlistcover"/>
                        <img src='../assets/playmask.png' id="playmask" alt="albumcover"/>
                </div>                
                <div className="updateplaylist--song--info">
                        <h5>{props.song.title}</h5>
                        <h6>{props.song.artist?.artistName}</h6>
                        {/* <h5><span>{props.duration}</span></h5> */}
                       
                </div>
                <div className="updateplaylist--song--options">
                        <img src={likedSong} id="playlist--song--heart" alt="heart" onClick={ () =>  handleLike()} />
                        <img src="../assets/share.png" id="playlist--song--share" alt="share"/>
                        <img src="../assets/more.png" id="playlist--song--more" alt="more"/>
                </div>     
                      

            </div>

    )
}