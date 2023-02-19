import React from "react"

export default function SongInfo(props) { 

    return(
        <div className="song--info">
            <div className="songfile--name">
            <label>{props.songFile[props.i].name}</label>
            </div>
            <div>
            <input type="text" name="songName" placeholder="Song Title" onChange={props.handleTItle}></input>
            </div>
        </div>
    )
}
