import React from "react"

// Component for displaying individual song info
export default function SongInfo(props) {

    const handleRemoveSong = () => {
        props.setSongFile(props.songFile.filter((_, i) => i !== props.i));
        props.setToUploadSongs(props.toUploadSongs.filter((_, i) => i !== props.i));
        //props.i--;
    }

    const handleTitle = (e) => {
        const newToUploadSongs = Array.isArray(props.toUploadSongs) ? [...props.toUploadSongs] : [];
        newToUploadSongs[props.i] = { ...newToUploadSongs[props.i], title: e.target.value }
        props.setToUploadSongs(newToUploadSongs);
    }

    return (
        <div className="uploadmusic--song--info">
            <div className="upload--music--songfile--name">
                {props.songFile[props.i] && (
                    <>
                        <label>{props.songFile[props.i].name}</label>
                        {console.log("song number: " + props.i)}
                        <input type="text" name="songName" placeholder="Song Title" onChange={handleTitle}></input>
                        <td className="uploadmusic--columnt">
                            <label>
                                Featured Artists:
                                <br />
                                <textarea
                                    value={props.featuredArtists}
                                    name="artistName"
                                    placeholder="Artist Name"
                                    onChange={props.handleFeaturedArtists}
                                />
                            </label>
                        </td>
                        <button onClick={handleRemoveSong}>Remove</button>
                    </>
                )}
            </div>
            <div>
                {/* <h3>{props.title}</h3> */}
                {/* {console.log("index: " + [props.i])}
                {console.log("file: " + props.songFile[props.i])}
                {console.log("file name: " + props.songFile[props.i].name)} */}

                {/* <input type="text" name="title" value={props.title} placeholder="Song Title" onChange={props.handleTitle}></input> */}

                {/* {props.title[0].forEach(element => {
                    
                })} */}

                {console.log("Props song: " + props.song)}
                {console.log("Props title: " + props.title)}
                {/* {console.log("Props title[0]: " + props.title[0])} */}


                {/* <input type="text" name={`songName` + props.i} value={props.title[`songName` + props.i]} placeholder="Song Title" onChange={props.handleTitle}></input> */}

            </div>
        </div>
    )
}