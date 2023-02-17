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
    <div className="column song--form">
      {/* <label className="custom-file-upload">
        <input type="file" name="songFile" value="" accept="audio/*" className="gradient--btn image--btn hide--file" onChange={props.handleSongFileChange} />
        Choose Song <img src="../../assets/upload_icon.png" id="upload--icon" alt="upload_icon" />
      </label> */}

      <table>
        <tbody>
          <tr>
            <td className="columnt">
              <label>
                Song Name:
                <br />
                <input type="text" name="songName" placeholder="Song Name" onChange={props.handleTitle} />
              </label>
            </td>
          </tr>
          <tr>
            <td className="columnt">
              <label>
                Artist:
                <br />
                <input type="text" name="artist" placeholder="Artist" onChange={props.handleArtist} />
              </label>
            </td>
          </tr>
          <tr>
            <td className="columnt">
              <label>
                Featured Artists:
                <br />
                <input type="text" name="featuredArtists" placeholder="Featured Artists" onChange={props.handleFeaturedArtists} />
              </label>
            </td>
          </tr>
          <tr>
            <td className="columnt">
              <label>
                Album Name:
                <br />
                <input type="text" name="albumName" placeholder="Album Name" onChange={props.handleAlbumName} />
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
              <input type="number" name="highlightStart" placeholder="00:00" min="0" onChange={props.handleHighlightStart} />
            </td>
            <td className="hotspot--stop">
              <label>
                Stop:
              </label>
              <input type="number" name="highlightStop" placeholder="00:00" min="0" onChange={props.handleHighlightStop} />
              <br />
            </td>
          </tr>
          <td className="columnt">
            <label>
              Release Year:
              <br />
              <input type="number" name="releaseYear" placeholder="YYYY" min="1900" max="2024" onChange={props.handleReleaseYear} />
            </label>
          </td>
          <tr>
            <td className="columnt">
              <label>
                Genre:
              </label>
            </td>
          </tr>
          <fieldset>
            <tr>
              <td className="genre--radio">
                <input type="radio" name="genre" value="pop" checked={props.genre === "pop"} onChange={props.handleGenre}/>POP
              </td>
              <td className="genre--radio">
                <input type="radio" name="genre" value="rock" checked={props.genre === "rock"} onChange={props.handleGenre}/>ROCK
              </td>
            </tr>
            <tr>
              <td className="genre--radio">
                <input type="radio" name="genre" value="country" checked={props.genre === "country"} onChange={props.handleGenre}/>COUNTRY
              </td>
              <td className="genre--radio">
                <input type="radio" name="genre" value="hiphop" checked={props.genre === "hiphop"} onChange={props.handleGenre}/>HIP-HOP
              </td>
            </tr>
          </fieldset>
          <tr>
            <td className="columnt">
              <label>
                Release Type:
              </label>
            </td>
          </tr>
          <fieldset>
            <tr>
              <td className="release--radio">
                <input type="radio" name="releasetype" value="album" checked={props.releaseType === "album"} onChange={props.handleReleaseType} />ALBUM
              </td>
              <td className="release--radio">
                <input type="radio" name="releasetype" value="ep" checked={props.releaseType === "ep"} onChange={props.handleReleaseType} />EP
              </td>
              <td className="release--radio">
                <input type="radio" name="releasetype" value="single" checked={props.releaseType === "single"} onChange={props.handleReleaseType} />SINGLE
              </td>
            </tr>
          </fieldset>
          <tr>
            <td className="columnt">
              <input type="submit" value="Submit" className="gradient--btn submit--btn" onClick={props.handleSubmit} />
            </td>
          </tr>

        </tbody>
      </table>

    </div>
  )
}