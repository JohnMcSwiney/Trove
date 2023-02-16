import React from "react"
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

export default function MusicDetails(props) {
  //  const [listFiles, setListFiles] = React.useState(false)  

      React.useEffect(() => {
        console.log("files changed!");
        console.log(props.files);
    }, [props.files]);

    // if(props.files.length > 0) {
    //   setListFiles(prevListFiles => !prevListFiles);
    // }

    // let isFiles=null; 

    //   if (listFiles) {
    //         isFiles = <h4>{props.files[0].filename}</h4> 

    //   } 

    //   React.useEffect(() => {
    //     if(props.files.length > 0 ) {

    //     }

    //     console.log("files changed!");
    //     console.log(props.files);
    // }, [props.files]);

    return (
        <div className="column song--form">
        {/* <h2>MUSIC DETAILS</h2> */}
            <div className="add--song"> 
           <FilePond
                files={props.files}
                onupdatefiles={props.setFiles}
                allowMultiple={true}
                maxFiles={1}
                //server="/"
                name="songFile" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                allowFileEncode={true}
            />
            </div>

            <table>
              <tbody>
              <tr>
                <td className="columnt">
                <label>
                Song Name:
                <br />
                    <input type="text" name="title" placeholder="Song Name" onChange={props.handleChange}/>
                </label>  
                </td>                          
              </tr>
              <tr>
                <td  className="columnt">
                <label>
                  Album Name:
                  <br />
                      <input type="text" name="album" placeholder="Album Name"  onChange={props.handleChange} />
                </label>
                </td>                          
              </tr>
              <tr>
                <td className="columnt">
                <label>
                  Hot Spot:
                  </label>
                  </td>
                </tr>
                <tr>
                  <td className="hotspot--start">
                  <label>
                  Start:
                  </label>
                  <input type="number" name="highlightStart" placeholder="00:00" min="0" onChange={props.handleChange}/>
                </td>   
                <td  className="hotspot--stop">
                  <label>
                  Stop:
                  </label>
                  <input type="number" name="highlightStop" placeholder="00:00" min="0"  onChange={props.handleChange}/>
                  <br/> 
                </td>                
              </tr>
              <td  className="columnt">
                <label>
                  Release Year:
                  <br />
                      <input type="number" name="releaseYear" placeholder="YYYY" min="1900" max="2024"  onChange={props.handleChange} />
                </label>
                </td>     
              <tr>
                  <td  className="columnt">
                    <label>
                      Genre:
                    </label>
                  </td> 
              </tr> 
              <fieldset>
              <tr>
                  <td className="genre--radio">
                        <input type="radio" name="genre" value="pop" checked={props.formData.genre === "pop"} onChange={props.handleChange}/>POP
                  </td>
                  <td className="genre--radio">
                        <input type="radio" name="genre" value="rock" checked={props.formData.genre === "rock"} onChange={props.handleChange}/>ROCK
                  </td>
              </tr>
              <tr>
                  <td className="genre--radio">
                        <input type="radio" name="genre" value="country" checked={props.formData.genre === "country"} onChange={props.handleChange} />COUNTRY
                  </td>
                  <td className="genre--radio">
                        <input type="radio" name="genre" value="hiphop"checked={props.formData.genre === "hiphop"} onChange={props.handleChange} />HIP-HOP
                  </td>
              </tr>
              </fieldset>
              <tr>
                  <td  className="columnt">
                    <label>
                      Release Type:
                    </label>
                  </td> 
              </tr> 
              <fieldset>
              <tr>
                  <td className="release--radio">
                        <input type="radio" name="releasetype" value="album" checked={props.formData.releasetype === "album"} onChange={props.handleChange}/>ALBUM
                  </td>
                  <td className="release--radio">
                        <input type="radio" name="releasetype" value="ep" checked={props.formData.releasetype === "ep"} onChange={props.handleChange}/>EP
                  </td>
                  <td className="release--radio">
                        <input type="radio" name="releasetype" value="single" checked={props.formData.releasetype === "single"} onChange={props.handleChange} />SINGLE
                  </td>
              </tr>
              </fieldset>
              <tr>
                <td  className="columnt">
                  <input type="submit" value="Submit" className="gradient--btn submit--btn" onClick={props.handleSubmit} /> 
                </td>
              </tr>

            </tbody>
            </table>

            {/* {isFiles} */}

           {/* { props.files && <h4>{props.files[0].filename}</h4> 
            
           } */}

        </div>
    )
}