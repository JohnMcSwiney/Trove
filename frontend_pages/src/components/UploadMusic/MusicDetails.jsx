import React from "react"

export default function MusicDetails(props) {


    return (
        <div className="column song--form">
        <h2>MUSIC DETAILS</h2>
            <table>
              <tbody>
              <tr>
                <td className="columnt">
                {/* <label>
                Song Name:
                <br />
                    <input type="text" name="songName" placeholder="Song Name"  onChange={props.handleChange}/>
                </label>   */}
                </td>                          
              </tr>
              <tr>
                <td  className="columnt">
                <label>
                  Album Name:
                  <br />
                      <input type="text" name="albumName" placeholder="Album Name"  onChange={props.handleChange} />
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
                  <input type="number" name="highlightStart" placeholder="00:00"  onChange={props.handleChange}/>
                </td>   
                <td  className="hotspot--stop">
                  <label>
                  Stop:
                  </label>
                  <input type="number" name="highlightStop" placeholder="00:00"  onChange={props.handleChange}/>
                  <br/> 
                </td>                
              </tr>
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

        </div>
    )
}