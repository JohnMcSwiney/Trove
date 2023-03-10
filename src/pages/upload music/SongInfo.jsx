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
                        <button onClick={handleRemoveSong}>Remove</button>
                    </>
                )}
            </div>
            <div>
                {/* <h3>{props.title}</h3> */}
                {/* {console.log("index: " + [props.i])}
                {console.log("file: " + props.songFile[props.i])}
                {console.log("file name: " + props.songFile[props.i].name)} */}

                <input type="text" placeholder="Song Title" onChange={props.handleTitle}></input>

            </div>
        </div>
    )
}