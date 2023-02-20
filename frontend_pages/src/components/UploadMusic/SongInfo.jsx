import React from "react"

// Component for displaying individual song info
export default function SongInfo(props) { 

    return(
        <div className="song--info">
            <div className="songfile--name">
            <label>{props.songFile[props.i].name}</label>
            </div>
            <div>
            <input type="text" name={`songName` + props.i} value={props.title[`songName`+ props.i]} placeholder="Song Title" onChange={props.handleTitle}></input>
            </div>
        </div>
    )
}