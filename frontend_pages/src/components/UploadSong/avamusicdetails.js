import React from "react"
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
// import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
// import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

// Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode)

export default function MusicDetails(props) {

  // React.useEffect(() => {
  //   console.log("files changed!");
  //   console.log("props.songFile: " + props.songFile);
  //   //console.log(props.songFile)
  //   //[prop.songFile]
  // }, [props.songFile]);

  return (
    <div className="uploadsong--column uploadsong--song--form">
      <label className="uploadsong--custom-song-upload">
        <input type="file" name="songFile" value="" accept="audio/*" className="uploadsong--hide--file" onChange={props.handleSongFileChange} />
        Add Song 
        {/* <img src="../../assets/upload_icon.png" id="upload--icon" alt="upload_icon" /> */}
      </label>

      <table>
        <tbody>
          <tr>
            <td className="uploadsong--columnt">
              <label>
                Song Name:
                <br />
                <input type="text" name="songName" placeholder="Song Name" onChange={props.handleTitle} />
              </label>
            </td>
          </tr>
          <tr>
            <td className="uploadsong--columnt">
              <label>
                Artist:
                <br />
                <input type="text" name="artist" placeholder="Artist" onChange={props.handleArtist} />
              </label>
            </td>
          </tr>
          <tr>
            <td className="uploadsong--columnt">
              <label>
                Album Name:
                <br />
                <input type="text" name="albumName" placeholder="Album Name" onChange={props.handleAlbumName} />
              </label>
            </td>
          </tr>
          <tr>
            <th colSpan="1" className="uploadsong--columnt">
                Hot Spot:
            </th>
          </tr>
          <tr>
            <td className="uploadsong--hotspot--start">
              <label>
                Start:
              </label>
              <input type="number" name="highlightStart" placeholder="00:00" min="0" onChange={props.handleHighlightStart} />
            </td>
            <td className="uploadsong--hotspot--stop">
              <label>
                Stop:
              </label>
              <input type="number" name="highlightStop" placeholder="00:00" min="0" onChange={props.handleHighlightStop} />
              <br />
            </td>
          </tr>
          <td className="uploadsong--columnt">
            <label>
              Release Year:
              <br />
              <input type="number" name="releaseYear" placeholder="YYYY" min="1900" max="2024" onChange={props.handleReleaseYear} />
            </label>
          </td>
          <tr>
            <td className="uploadsong--columnt">
              <label>
                Genre:
              </label>
            </td>
          </tr>
          <fieldset>
            <tr>
              <td className="uploadsong--genre--radio">
                <input type="radio" name="genre" value="pop" checked={props.genre === "pop"} onChange={props.handleGenre}/>POP
              </td>
              <td className="uploadsong--genre--radio">
                <input type="radio" name="genre" value="rock" checked={props.genre === "rock"} onChange={props.handleGenre}/>ROCK
              </td>
            </tr>
            <tr>
              <td className="uploadsong--genre--radio">
                <input type="radio" name="genre" value="country" checked={props.genre === "country"} onChange={props.handleGenre}/>COUNTRY
              </td>
              <td className="uploadsong--genre--radio">
                <input type="radio" name="genre" value="hiphop" checked={props.genre === "hiphop"} onChange={props.handleGenre}/>HIP-HOP
              </td>
            </tr>
          </fieldset>
          <tr>
            <td className="uploadsong--columnt">
              <label>
                Release Type:
              </label>
            </td>
          </tr>
          <fieldset>
            <tr>
              <td className="uploadsong--release--radio">
                <input type="radio" name="releasetype" value="album" checked={props.releaseType === "album"} onChange={props.handleReleaseType} />ALBUM
              </td>
              <td className="uploadsong--release--radio">
                <input type="radio" name="releasetype" value="ep" checked={props.releaseType === "ep"} onChange={props.handleReleaseType} />EP
              </td>
              <td className="uploadsong--release--radio">
                <input type="radio" name="releasetype" value="single" checked={props.releaseType === "single"} onChange={props.handleReleaseType} />SINGLE
              </td>
            </tr>
          </fieldset>
          <tr>
            <td className="uploadsong--columnt">
              <input type="submit" value="Submit" className="uploadsong--gradient--btn uploadsong--submit--btn" onClick={props.handleSubmit} />
            </td>
          </tr>

        </tbody>
      </table>

    </div>
  )
}