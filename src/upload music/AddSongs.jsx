import React from "react"
import ReactDOM from 'react-dom'

import SongInfo from "./SongInfo"



// Add Songs (song files, song title)
export default function AddSongs(props) {

    React.useEffect(() => {
        console.log("files changed!");
        console.log(props.files);
      }, [props.files]);

    return (
        <div className="uploadmusic--column uploadmusic--song--form">
            <h2>ADD SONGS</h2>
            <div className="uploadmusic--upload--songfile"><label className="uploadmusic--custom-song-upload">
                <input type="file" name="songFile" value="" accept="audio/*" className="uploadmusic--hide--file" onChange={props.handleSongFileChange} />
                Upload Song 
                {/* <img src="../../assets/upload_icon.png" id="upload--icon" alt="upload_icon" /> */}
            </label>
          
            <div className="uploadmusic--add--song">

        {/* Filepond, don't think we are using atm */}
            {/* 
            <FilePond
                files={props.files}
                onupdatefiles={props.setFiles}
                allowMultiple={true}
                maxFiles={8} */}
                {/* //server="/" */}
                {/* name="files"  */}
                {/* /* sets the file input name, it's filepond by default */ }
                {/* labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>' */}
                {/* allowFileEncode={true} */}
            {/* /> */}

            {/* When a song is added, display the song title input */}
            { props.toUploadSongs && props.toUploadSongs.map((item, index)=>{
            return(          
                <SongInfo
                    key={index}
                    {...item}
                    i={index}
                    songFile={props.songFile}
                    handleTitle={props.handleTitle}
                    title={props.title}
                    /> )
        })}
        </div>

            <div className="uploadmusic--navigate--form--btns uploadmusic--navigate--add--songs"> 
                <div className="uploadmusic--back--btn" onClick={ () => props.handleFormNavigation('MusicDetails')}>
                   <button 
                  className={"uploadmusic--gradient--btn uploadmusic--submit--btn"}
                  onClick={() => props.handleFormNavigation('MusicDetails')}
                  value="musicdet"
                  name="musicdet">Music Details</button>
                </div>
                <div className="uploadmusic--next--btn" >
                   <input type="submit" value="Submit" className="uploadmusic--gradient--btn uploadmusic--submit--btn" onClick={props.handleSubmit} /> 
                </div>
            
            </div>

            </div>



        </div>

    ) 


};