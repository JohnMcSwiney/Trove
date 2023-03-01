import React from "react"

// Component for displaying individual song info
export default function SongInfo(props) {

    const handleRemoveSong = () => {
        props.setSongFile(props.songFile.filter((_, i) => i !== props.i));
        props.setToUploadSongs(props.toUploadSongs.filter((_, i) => i !== props.i));
        //props.i--;
    }

    return (
        <div className="uploadmusic--song--info">
            <div className="upload--music--songfile--name">
                {props.songFile[props.i] && (
                    <>
                        <label>{props.songFile[props.i].name}</label>
                        <button onClick={handleRemoveSong}>X</button>
                        {console.log("props.i: " + props.i)}
                        {console.log("name: " + props.songFile[props.i])}
                    </>
                )}
            </div>
            <div>
                <input type="text" name={`songName` + props.i} value={props.title[`songName` + props.i]} placeholder="Song Title" onChange={props.handleTitle}></input>
            </div>
        </div>
    )
}