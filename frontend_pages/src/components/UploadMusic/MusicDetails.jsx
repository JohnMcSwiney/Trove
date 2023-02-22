import React from "react"

// Music Information page
export default function MusicDetails(props) {

    return (
        <div className="uploadmusic--column uploadmusic--song--form">
        <h2>MUSIC DETAILS</h2>

        {/* Album name, Highlight Start/Stop, Release Year, Genre, Release Type */}
        <div className="uploadmusic--music--details">
            <table>
              <tbody>
              <tr>
                <td  className="uploadmusic--columnt">
                <label>
                  Album Name:
                  <br />
                      <input type="text" value={props.album} name="albumName" placeholder="Album Name"  onChange={props.handleAlbumName} />
                </label>
                </td>                          
              </tr>
              <tr>
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
                  <input type="number" value={props.highlightStart} name="highlightStart" placeholder="00:00"  onChange={props.handleHighlightStart}/>
                </td>   
                <td colspan="2" className="uploadmusic--hotspot--stop">
                  <label>
                  Stop: 
                  </label>
                  <input type="number"  value={props.highlightStop} name="highlightStop" placeholder="00:00"  onChange={props.handleHighlightStop}/>
                  <br/> 
                </td>                
              </tr>
              <td className="uploadmusic--columnt">
              <label>
                Release Year:
                <br />
                <input type="number" name="releaseYear" value={props.releaseYear} placeholder="YYYY" min="1900" max="2024" onChange={props.handleReleaseYear} />
              </label>
              </td>
              <tr>
                  <td  className="uploadmusic--columnt">
                    <label>
                      Genre:
                    </label>
                  </td> 
              </tr> 
              <fieldset>
              <tr>
                  <td className="uploadmusic--genre--radio">
                        <input type="radio" name="genre" value='pop' checked={props.genre === "pop"} onChange={props.handleGenre}/>POP
                  </td>
                  <td className="uploadmusic--genre--radio">
                        <input type="radio" name="genre" value='rock' checked={props.genre === "rock"} onChange={props.handleGenre}/>ROCK
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
                  <td  className="uploadmusic--columnt">
                    <label>
                      Release Type:
                    </label>
                  </td> 
              </tr> 
              <fieldset>
              <tr>
                  <td className="uploadmusic--release--radio">
                        <input type="radio" name="releasetype" value='album' checked={props.releaseType === "album"} onChange={props.handleReleaseType}/>ALBUM
                  </td>
                  <td className="uploadmusic--release--radio">
                        <input type="radio" name="releasetype" value='ep' checked={props.releaseType === "ep"} onChange={props.handleReleaseType}/>EP
                  </td>
                  <td className="uploadmusic--release--radio">
                        <input type="radio" name="releasetype" value='single' checked={props.releaseType === "single"} onChange={props.handleReleaseType} />SINGLE
                  </td>
              </tr>
              </fieldset>
              <tr>
                <td  className="uploadmusic--columnt">
                  {/* <input type="submit" value="Submit" className="gradient--btn submit--btn" onClick={props.handleSubmit} />  */}
                </td>
              </tr>

            </tbody>
            </table>
            </div>
            
            <div className="uploadmusic--navigate--form--btns"> 
                <div className="next--btn" onClick={() => props.handleFormNavigation('AddSongs')}>
                  <button 
                  className={"uploadmusic--gradient--btn uploadmusic--submit--btn"}
                  onClick={() => props.handleFormNavigation('AddSongs')}
                  value="addsongz"
                  name="addsongz">Add Music</button>
                </div>
            
            </div>

        </div>
    )
}