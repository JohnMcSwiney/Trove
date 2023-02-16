import React from "react"

export default function ArtistAlbum(props) {

    function handleMouseOver(event) {
        

    }    
 
    return (
        <div className="slide" id={"slide-" + props.index}><div className="album--cover">
        <img src={props.cover} className="album--cover" onMouseOver={handleMouseOver} alt="album--cover"/>
        </div><div className="artist--name"><a href="/" className="song--title">{props.name}</a></div>
        <h6>{props.releaseDate}  {props.art}</h6></div>
    )
}