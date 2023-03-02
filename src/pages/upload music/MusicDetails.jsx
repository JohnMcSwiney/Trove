import React, { useState } from "react"
import AddSongs from "./AddSongs";
import SongInfo from "./SongInfo"


// Music Information page
export default function MusicDetails(props) {

  // const [isMultiple, setIsMultiple] = useState(false);

  const [isSingle, setIsSingle] = useState(false);

  const handleReleaseType = (e) => {

    const value = e.target.value;

    setIsSingle(value === "single");

    props.handleReleaseType(e);

  }

  // const handleReleaseType = (e) => {
  //     const value = e.target.value;

  //     console.log("release type value: " + value);

  //     if (value === "album" || value === "ep") {
  //         props.handleReleaseType(e);
  //         //isMultiple = true;


  //     }
  //     else {
  //         props.handleReleaseType(e);
  //         //isMultiple = false;

  //     }
  // }

  return (
    <div className="uploadmusic--column uploadmusic--song--form">
      <h2>MUSIC DETAILS</h2>

      {/* Album name, Highlight Start/Stop, Release Year, Genre, Release Type */}
      <div className="uploadmusic--music--details">
        <table>
          <tbody>
            <tr>
              <td className="uploadmusic--columnt">
                <label>
                  Release Type:
                </label>
              </td>
            </tr>
            <fieldset>
              <tr>
                <td className="uploadmusic--release--radio">
                  <input type="radio" name="releasetype" value='album' checked={props.releaseType === "album"} onChange={handleReleaseType} releaseType={props.releaseType} />ALBUM
                </td>
                <td className="uploadmusic--release--radio">
                  <input type="radio" name="releasetype" value='ep' checked={props.releaseType === "ep"} onChange={handleReleaseType} releaseType={props.releaseType} />EP
                </td>
                <td className="uploadmusic--release--radio">
                  <input type="radio" name="releasetype" value='single' checked={props.releaseType === "single"} onChange={handleReleaseType} releaseType={props.releaseType} />SINGLE
                </td>
              </tr>
            </fieldset>
            {isSingle ? (
              <tr>
                <td className="uploadmusic--columnt">
                  <label>
                    Song Name:
                    <br />
                    <input type="text" value={props.song} name="songName" placeholder="Song Name" onChange={props.handleTitle} />
                  </label>
                </td>
              </tr>
            ) : (
              <tr>
                <td className="uploadmusic--columnt">
                  <label>
                    Album/EP Name:
                    <br />
                    <input type="text" value={props.album} name="albumName" placeholder="Album Name" onChange={props.handleAlbumName} />
                  </label>
                </td>
              </tr>
            )}
            {/* <tr>
              <td className="uploadmusic--columnt">
                <label>
                  Album Name:
                  <br />
                  <input type="text" value={props.album} name="albumName" placeholder="Album Name" onChange={props.handleAlbumName} />
                </label>
              </td>
            </tr> */}
            {/* <tr>
                <td colSpan={2} className="uploadmusic--columnt">
                <label>
                  Hot Spot:
                  </label>
                  </td>
                </tr>
                <tr >
                  <td  className="uploadmusic--hotspot--start">
                  <label>
                  Start:
                  </label>
                  <input type="number" value={props.highlightStart} name="highlightStart" placeholder="00:00" min="0" onChange={props.handleHighlightStart}/>
                </td>   
                <td colspan="2" className="uploadmusic--hotspot--stop">
                  <label>
                  Stop: 
                  </label>
                  <input type="number"  value={props.highlightStop} name="highlightStop" placeholder="00:00" min="0"  onChange={props.handleHighlightStop}/>
                  <br/> 
                </td>                
              </tr> */}
            <td className="uploadmusic--columnt">
              <label>
                Release Year:
                <br />
                <input type="number" name="releaseYear" value={props.releaseYear} placeholder="YYYY" min="1900" max="2024" onChange={props.handleReleaseYear} />
              </label>
            </td>
            <tr>
              <td className="uploadmusic--columnt">
                <label>
                  Genre:
                </label>
              </td>
            </tr>
            <fieldset>
              <tr>
                <td className="uploadmusic--genre--radio">
                  <input type="radio" name="genre" value='pop' checked={props.genre === "pop"} onChange={props.handleGenre} />POP
                </td>
                <td className="uploadmusic--genre--radio">
                  <input type="radio" name="genre" value='rock' checked={props.genre === "rock"} onChange={props.handleGenre} />ROCK
                </td>
              </tr>
              <tr>
                <td className="uploadmusic--genre--radio">
                  <input type="radio" name="genre" value='country' checked={props.genre === "country"} onChange={props.handleGenre} />COUNTRY
                </td>
                <td className="uploadmusic--genre--radio">
                  <input type="radio" name="genre" value='hiphop' checked={props.genre === "hiphop"} onChange={props.handleGenre} />HIP-HOP
                </td>
              </tr>
            </fieldset>
            <tr>
              <td className="uploadmusic--columnt">
                {/* <input type="submit" value="Submit" className="gradient--btn submit--btn" onClick={props.handleSubmit} />  */}
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      {isSingle ? (
        <>
          <div className="uploadmusic--upload--songfile">
            <label className="uploadmusic--custom-song-upload">
              <input type="file" name="songFile" value="" accept="audio/*" className="uploadmusic--hide--file" onChange={props.handleSongFileChange} />
              Upload Song
            </label>

            {props.toUploadSongs && props.toUploadSongs.map((item, index) => {
              return (
                <SongInfo
                  key={index}
                  {...item}
                  i={index}
                  songFile={props.songFile}
                  handleTitle={props.handleTitle}
                  setSongFile={props.setSongFile}
                  setToUploadSongs={props.setToUploadSongs}
                  title={props.title}
                />)
            })}

          </div><div className="uploadmusic--next--btn uploadmusic--finish--btn">
            <input type="submit" value="Submit" className="uploadmusic--gradient--btn uploadmusic--submit--btn" onClick={props.handleSubmit} />
          </div>
        </>
      ) : (
        <div className="uploadmusic--navigate--form--btns">
          <div className="next--btn" onClick={() => props.handleFormNavigation('AddSongs')}>
            <button
              className={"uploadmusic--gradient--btn uploadmusic--submit--btn"}
              onClick={() => props.handleFormNavigation('AddSongs')}
              on
              value="addsongz"
              releaseType={props.releaseType}
              name="addsongz">Add Music</button>
          </div>
        </div>
      )}

    </div>
  )
}