import React, { useState } from "react";
import AddSongs from "./AddSongs";
import SongInfo from "./SongInfo";
import Select from "react-select";
// Music Information page
export default function MusicDetails(props) {
  // const [isMultiple, setIsMultiple] = useState(false);

  const handleRemoveSong = () => {
    props.handleSongFileChange(props.songFile.filter((_, i) => i !== props.i));
    props.handleSongFileChange(
      props.toUploadSongs.filter((_, i) => i !== props.i)
    );
  };

  const handleSelectChange = (selectedOptions) => {
    console.log(selectedOptions)
    if (!selectedOptions) {
      props.setFeaturedArtists([]);
      return;
    }
    const selectedList = [];
    for (const item of props.artists) {
      for (var i = 0; i < selectedOptions.length; i++) {
        if (
          selectedOptions[i].value === item._id ||
          (selectedOptions[i].artist && selectedOptions[i].id === item._id)
        ) {
          selectedList.push(item._id);
          break;
        }
      }
    }
    props.setFeaturedArtists(selectedList);
  }
  return (
    <div className="uploadmusic--column uploadmusic--song--form">
      <h2>MUSIC DETAILS</h2>

      {/* Album name, Highlight Start/Stop, Release Year, Genre, Release Type */}
      <div className="uploadmusic--music--details">
        <table>
          <tbody>
            <tr>
              <td className="uploadmusic--columnt">
                <label>Release Type:</label>
              </td>
            </tr>
            <fieldset>
              <tr>
                <td className="uploadmusic--release--radio">
                  <input
                    type="radio"
                    name="releasetype"
                    value="album"
                    checked={props.releaseType === "album"}
                    onChange={props.handleReleaseType}
                    releaseType={props.releaseType}
                  />
                  ALBUM
                </td>
                <td className="uploadmusic--release--radio">
                  <input
                    type="radio"
                    name="releasetype"
                    value="ep"
                    checked={props.releaseType === "ep"}
                    onChange={props.handleReleaseType}
                    releaseType={props.releaseType}
                  />
                  EP
                </td>
                <td className="uploadmusic--release--radio">
                  <input
                    type="radio"
                    name="releasetype"
                    value="single"
                    checked={props.releaseType === "single"}
                    onChange={props.handleReleaseType}
                    releaseType={props.releaseType}
                  />
                  SINGLE
                </td>
              </tr>
            </fieldset>
            <tr>
                <td className="uploadmusic--columnt">
                  <label>
                    Artist:
                    <br />
                    <input
                      type="text"
                      value={props.artist}
                      readOnly
                      name="albumName"
                      placeholder="Artist Name"
                      // onChange={props.handleAlbumName}
                    />
                  </label>
                </td>
              </tr>
            <tr>
              <td className="uploadmusic--columnt">
                <label htmlFor="search">Featured Artists: 
                <Select
                  id="search"
                  options={props.artists.map((artist) => ({
                    value: artist.artistName,
                    label: (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={artist.artistImg}
                          alt={artist.artistName}
                          width="30"
                          height="30"
                          style={{ marginRight: "10px" }}
                        />
                        {artist.artistName}
                      </div>
                    ),
                    id: artist?._id,
                    artist: artist,
                    artistName: artist.artistName,
                  }))}
                  isMulti
                  className="uploadmusic--basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select an artist"

                  onChange={handleSelectChange}
                />
                 </label>
              </td>
            </tr>
            {props.releaseType === "album" && (
              <tr>
                <td className="uploadmusic--columnt">
                  <label>
                    Album Name:
                    <br />
                    <input
                      type="text"
                      value={props.album}
                      name="albumName"
                      placeholder="Album Name"
                      onChange={props.handleAlbumName}
                    />
                  </label>
                </td>
              </tr>
            )}
            {props.releaseType === "ep" && (
              <tr>
                <td className="uploadmusic--columnt">
                  <label>
                    EP Name:
                    <br />
                    <input
                      type="text"
                      value={props.ep}
                      name="epName"
                      placeholder="EP Name"
                      onChange={props.handleEPName}
                    />
                  </label>
                  {console.log("EP Name: " + props.ep)}
                </td>
              </tr>
            )}
            {props.releaseType === "single" && (
              <tr>
                <td className="uploadmusic--columnt">
                  <label>
                    Song Name:
                    <br />
                    <input
                      type="text"
                      // value={props.song}
                      value={props.title}
                      name="songName"
                      placeholder="Song Name"
                      onChange={props.handleTitle}
                    />
                    {console.log("Song Name: " + props.title)}
                  </label>
                </td>
              </tr>
            )}
            <td className="uploadmusic--columnt">
              <label>
                Release Year:
                <br />
                <input
                  type="number"
                  name="releaseYear"
                  value={props.releaseYear}
                  placeholder="YYYY"
                  min="1900"
                  onChange={props.handleReleaseYear}
                  required
                />
              </label>
            </td>
            <tr>
              <td className="uploadmusic--columnt">
                <label>Genre:</label>
              </td>
            </tr>
            <fieldset required>
              <tr>
                <td className="uploadmusic--genre--radio">
                  <input
                    type="radio"
                    name="genre"
                    value="pop"
                    checked={props.genre === "pop"}
                    onChange={props.handleGenre}
                    required
                  />
                  POP
                </td>
                <td className="uploadmusic--genre--radio">
                  <input
                    type="radio"
                    name="genre"
                    value="rock"
                    checked={props.genre === "rock"}
                    onChange={props.handleGenre}
                    required
                  />
                  ROCK
                </td>
              </tr>
              <tr>
                <td className="uploadmusic--genre--radio">
                  <input
                    type="radio"
                    name="genre"
                    value="country"
                    checked={props.genre === "country"}
                    onChange={props.handleGenre}
                    required
                  />
                  COUNTRY
                </td>
                <td className="uploadmusic--genre--radio">
                  <input
                    type="radio"
                    name="genre"
                    value="hiphop"
                    checked={props.genre === "hiphop"}
                    onChange={props.handleGenre}
                    required
                  />
                  HIP-HOP
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
      {props.releaseType == "single" ? (
        <> 
            <div className="upload--music--songfile--name single ">
              {props.songFile && 
                    <div className="uploadmusic--single--info " >
                      
                    <div className="uploadmusic--delsingle">
                        <img src="../assets/xsongsymbol.png" alt="deletesongicon" onClick={handleRemoveSong} />
                    </div>
                    <div className="uploadmusic--songfile--name single">
                    {props.songFile && (
                        <>
                          <label>{props.songFile.name}</label>
                        </>
                      )}
                    </div>
                  </div>
              }
            </div>
 
          <div className="uploadmusic--navigate--form--btns uploadmusic--navigate--single--songs">
          <div className="uploadmusic--upload--songfile">
              <label className="uploadmusic--custom-single-upload">
                <input
                  type="file"
                  name="songFile"
                  value=""
                  accept="audio/*"
                  className="uploadmusic--hide--file"
                  onChange={props.handleSongFileChange}
                  required
                />
                Upload Song
              </label>
            </div>
            <div className="uploadmusic--next--btn uploadmusic--finish--btn">
              <input
                type="submit"
                value="Submit"
                className="uploadmusic--gradient--btn uploadmusic--single--btn"
                onClick={props.handleSubmit}
              />
            </div>
          </div>


          
        </>
      ) : (
        <div className="uploadmusic--navigate--form--btns">
          <div
            className="next--btn musicdets--addsongs-btn"
            onClick={() => props.handleFormNavigation("AddSongs")}
          >
            <button
              className={"uploadmusic--gradient--btn uploadmusic--submit--btn"}
              onClick={() => props.handleFormNavigation("AddSongs")}
              on
              value="addsongz"
              releaseType={props.releaseType}
              name="addsongz"
            >
              Add Music
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
