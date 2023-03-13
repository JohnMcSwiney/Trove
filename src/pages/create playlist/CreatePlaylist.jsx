import React from "react";

import "./CreatePlaylist.css";
import albumsongs from "../../data/albumsongs.json";
import PlaylistSong from "./PlaylistSong";
import PopUp from "./Popup";

// To create a playlist
export default function CreatePlaylist(props) {
  const user = localStorage.getItem("user");
  const id = JSON.parse(user).id;

  const default_album = "../assets/default_playlistcover.png";
  const addSongImg = "../assets/addsongsymbol.png";
  const removeSongImg = "../assets/xsongsymbol.png";
  const [previewCover, setPreviewCover] = React.useState(default_album);
  const [albumSongs, setAlbumSongs] = React.useState(albumsongs);
  const [playlistSongList, setPlaylistSongList] = React.useState(albumsongs);

  const [imageFile, setImageFile] = React.useState();
  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setPreviewCover(URL.createObjectURL(e.target.files[0]));
  };

  function handleRemoveSong(song, songAction) {
    console.log(song.idno);

    if (songAction === "remove") {
      const newList = playlistSongList.filter((item) => item.idno != song.idno);

      setPlaylistSongList(newList);
    } else if (songAction === "add") {
      setPlaylistSongList((prevPlaylistSongs) => [...prevPlaylistSongs, song]);
    }
  }

  const [modalIsOpen, setIsOpen] = React.useState(true);

  function togglePop() {
    setIsOpen((prevModalIsOpen) => !prevModalIsOpen);
    console.log("OPENED!");
  }

  function addPlaylistSongs(newSong) {
    setAlbumSongs((prevAlbumSongs) => [...prevAlbumSongs, newSong]);
  }

  return (
    <section>
      {/* PLAYLIST'S INFO */}
      {modalIsOpen ? <div className="createplaylist--popupmask"></div> : null}
      {modalIsOpen ? (
        <PopUp
          togglePop={togglePop}
          addPlaylistSongs={addPlaylistSongs}
          albumSongs={albumSongs}
          songActionImg={addSongImg}
          handleRemoveSong={handleRemoveSong}
        />
      ) : null}
      <div className="createplaylist--info">
        <div className="createplaylist--song--cover">
          <img src={previewCover} alt="playlist" />
          <label className="createplaylist--custom-file-upload">
            <input
              type="file"
              name="cover"
              value=""
              accept="image/*"
              className="createplaylist--gradient--btn createplaylist--image--btn createplaylist--hide--file"
              onChange={handleImageFileChange}
            />
            Choose Image{" "}
            <img
              src="../../assets/upload_icon.png"
              id="upload--icon"
              alt="upload_icon"
            />
          </label>
        </div>
        <div className="createplaylist--stats--info">
          <div className="createplaylist--createbtn">
            <input
              type="submit"
              value="Create"
              className="createplaylist--gradient--btn createplaylist--submit--btn"
            />
          </div>
          <input type="text" id="playlisttitle" placeholder="Playlist Name" />
          <div className="createplaylist--release--info">
            {/* <h5>2014</h5> */}
            <input
              type="textarea"
              id="playlistdesc"
              placeholder="Add Description (Optional)"
              name="playlist description"
            />
            {/* <h6>PLAYLIST</h6> */}
          </div>
          {/* <h4>Creator Username</h4> */}
        </div>
      </div>

      <div className="createplaylist--addsongs">
        <div className="createplaylist--searchbar">
          {/* <input type="text" id="searchbar" placeholder="Search Songs"/> */}
          <input
            type="button"
            value="Add Songs"
            className="createplaylist--gradient--btn createplaylist--addsongsbtn"
            onClick={togglePop}
          />
          <div className="createplaylist--addedsongs"></div>
        </div>

        <div className="createplaylist--songs">
          {playlistSongList &&
            playlistSongList.map((item, index) => {
              return (
                <PlaylistSong
                  key={index}
                  {...item}
                  song={item}
                  index={index}
                  handleRemoveSong={handleRemoveSong}
                  songActionImg={removeSongImg}
                  songAction={"remove"}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}
