import React from "react"

// User's Liked Song List
export default function SongList(props) {

    return (
        <div className="slide" id={"slide-" + props.index}><div className="album--cover">
        <img src={props.cover} className="album--cover" alt="album--cover"/>
        </div><div className="artist--name"><a href="/" className="song--title">{props.title}</a>
        </div><br/> <div className="song--artist"><a href="/" className="">{props.artist}</a> </div> 
        <div className="song--genre"><h6>{props.genre}</h6></div></div>
    )
}