import React from "react"

// User's Liked Song List
export default function SongList(props) {

    return (
        <div className="user--slide" id={"user--slide-" + props.index}><div className="user--album--cover">
        <img src={props.cover} className="user--album--cover" alt="album--cover"/>
        </div><div className="user--artist--name"><a href="/" className="user--song--title">{props.title}</a>
        </div><br/> <div className="user--song--artist"><a href="/" className="">{props.artist}</a> </div> 
        <div className="user--song--genre"><h6>{props.genre}</h6></div></div>
    )
}