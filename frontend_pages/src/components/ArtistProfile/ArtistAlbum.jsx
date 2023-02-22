import React from "react"

// Album Component
export default function ArtistAlbum(props) {

    function handleMouseOver(event) {
        

    }    
 
    return (
        <div className="artist--slide" id={"artist--slide-" + props.index}><div className="artist--album--cover">
        <img src={props.cover} className="artist--album--cover" onMouseOver={handleMouseOver} alt="album--cover"/>
        </div><div className="artist--artist--name"><a href="/" className="artist--song--title">{props.name}</a></div>
        <h6>{props.releaseDate}  {props.art}</h6></div>
    )
}