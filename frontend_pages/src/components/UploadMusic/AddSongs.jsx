import React from "react"
import ReactDOM from 'react-dom'

import SongInfo from "./SongInfo"

import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
// import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode)

export default function AddSongs(props) {

    React.useEffect(() => {
        console.log("files changed!");
        console.log(props.files);
      }, [props.files]);

    return (
        <div className="column song--form">
            <h2>ADD SONGS</h2>
            <label className="custom-song-upload">
                <input type="file" name="songFile" value="" accept="audio/*" className="gradient--btn image--btn hide--file" onChange={props.handleSongFileChange} />
                Add Song 
                {/* <img src="../../assets/upload_icon.png" id="upload--icon" alt="upload_icon" /> */}
            </label>
            <div className="add--song">

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

             <input type="submit" value="Submit" className="gradient--btn submit--btn" onClick={props.handleSubmit} /> 
{/* 
            {
                    props.files && props.files.map((item, index)=>{
                    return(          
                        <SongInfo
                            key={index}
                            {...item}
                            files={props.files}
                            />

                ) })} */}

            </div>

            <div className="navigate--form---btns"> 
                <div className="back--btn" onClick={ () => props.handleFormNavigation('MusicDetails')}>
                  <img src="../assets/backbtn.png" id="back--icon" alt="back--icon"/>
                  <br/>
                  <label for="back--icon">Back</label>
                </div>
                <div className="next--btn" onClick={() => props.handleFormNavigation('ReviewSongs')}>
                  <img src="../../assets/nextbtn.png" id="next--icon" alt="next--icon"/>
                  <br/>
                  <label for="next--icon">Next</label>
                </div>
            
            </div>


        </div>

    ) 


};