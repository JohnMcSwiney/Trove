import React from "react";

import "./UpdatePlaylist.css";
import albumsongs from "../../../data/albumsongs.json";
import PlaylistSong from "./PlaylistSong";
import PopUp from "./Popup";

import firebase from "./firebaseConfig";

import { useUpdatePlaylist } from "../../../hooks/user-hooks/useUpdatePlaylist";
import { useDeletePlaylist } from "../../../hooks/user-hooks/useDeletePlaylist";
import { useNavigate, useParams } from "react-router-dom";
// To create a playlist
export default function UpdatePlaylist(props) {
  //search
  const [songs, setSongs] = React.useState(null);
  const [songData, setSongData] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState({});
  const [done, setDone] = React.useState(true);

  // get playlist
  let { id } = useParams();
  const [playlist, setPlaylist] = React.useState(null);

  React.useEffect(() => {
    const fetchPlaylist = async () => {
      const playlistResponse = await fetch(`/api/playlists/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const playlistJson = await playlistResponse.json();
      if (playlistResponse.ok) {
        setPlaylist(playlistJson);
      }
    };
    fetchPlaylist();
  }, []);

  const searchAPI = React.useEffect(() => {
    const fetchSearch = async () => {
      if (search == "") {
        setDone(true);
        return;
      } else {
        setDone(false);
        setTimeout(() => {
          fetch(`/api/search/${search}`)
            .then((response) => response.json())
            .then((json) => {
              setSearchResult(json);
              setDone(true);
            });
        }, 500);
      }
    };
    fetchSearch();
  }, [search]);

  // user id
  const user = localStorage.getItem("user");
  const creatorid = JSON.parse(user).id;

  //playlist val states
  const default_album = "../assets/default_playlistcover.png";
  const addSongImg = "../assets/addsongsymbol.png";
  const removeSongImg = "../assets/xsongsymbol.png";
  const [previewCover, setPreviewCover] = React.useState(default_album);
  const [albumSongs, setAlbumSongs] = React.useState(albumsongs);
  const [playlistSongList, setPlaylistSongList] = React.useState([]);
  const [songList, setSongList] = React.useState([]);

  const [playlistName, setPlaylistName] = React.useState("");
  const [imageFile, setImageFile] = React.useState();
  const [imageWasChanged, setImageWasChanged] = React.useState(false);

  React.useEffect(() => {
    setPreviewCover(playlist?.playlistCoverUrl);
    setPlaylistSongList(playlist?.songList);
    setSongList(playlist?.songList.map((song) => song._id));
    // setSongList(playlist?.songList._id)
    setPlaylistName(playlist?.playlistName);
  }, [playlist]);

  //handle changes
  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setPreviewCover(URL.createObjectURL(e.target.files[0]));
    // setImageWasChanged(true);
  };

  const handlePlaylistName = (e) => {
    setPlaylistName(e.target.value);
  };

  // handle song from playlist songlist
  function handleActionSong(song, songAction, index) {
    console.log(song._id);

    if (songAction === "remove") {
      const newList = playlistSongList.filter((item) => item._id !== song._id);
      const newSongList = songList.filter((item) => item !== song._id);


      setPlaylistSongList(newList);
      setSongList(newSongList);

    } else if (songAction === "add") {

      setPlaylistSongList([
        ...playlistSongList,
        song
      ]);
      setSongList(([
        ...songList,
        song
      ]));


    }
  }

  // modal popup state
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function togglePop() {
    setIsOpen((prevModalIsOpen) => !prevModalIsOpen);
  }

  const navigate = useNavigate();
  // submit playlist
  const { updatePlaylist, error } = useUpdatePlaylist();
  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {

      // for (const song of playlist?.songList) {
      //   alert("should go in here if there is duplicate " + song.title); 
        // if (playlist.songList.includes(currentSong._id)) {
        //   console.log("duplicate song found");
  
        //   //playlist.songList.pop(currentSong._id);
        //   await Playlist.updateOne(
        //     { _id: playlist._id },
        //     {
        //       $in: playlist.songList,
        //       $pull: { songList: currentSong._id }
        //     },
        //     { new: true }
        //   );
        //   alert("backend removed duplicate song");
        // }
  
        // if (playlist.songList.some(item => item.id === song._id)) {
        //   playlist.songList.pop(song._id);
        //   alert("found duplicate song, should be removed");
        // }
      // }
      // alert("This is the song list" + songList);
      await updatePlaylist(id, playlistName, creatorid, imageFile, songList);

      navigate("/mytrove");
    } catch (error) {
      console.log(error);
    }
  };

  const { deletePlaylist } = useDeletePlaylist();
  const handleDelete = async (e) => {
    console.log("CLICKED SUBMIT");
    try {
      await deletePlaylist(id);
    } catch (error) {
      console.log(error);
    }

    console.log("CLICKED SUBMIT 2");
  };

  return (
    <section>
      {/* PLAYLIST'S INFO */}
      {modalIsOpen ? <div className="updateplaylist--popupmask"></div> : null}
      {modalIsOpen ? (
        <PopUp
          togglePop={togglePop}
          albumSongs={albumSongs}
          songActionImg={addSongImg}
          handleActionSong={handleActionSong}
          search={search}
          setSearch={setSearch}
          done={done}
          setSongData={setSongData}
          searchResult={searchResult}
          songAction={"add"}
        />
      ) : null}
      <div className="updateplaylist--info">
        <div className="updateplaylist--song--cover">
          <img src={previewCover} alt="playlist" />
          <label className="updateplaylist--custom-file-upload">
            <input
              type="file"
              name="cover"
              value=""
              accept="image/*"
              className="updateplaylist--gradient--btn updateplaylist--image--btn updateplaylist--hide--file"
              onChange={handleImageFileChange}
            />
            Update Image{" "}
            <img
              src="../../assets/upload_icon.png"
              id="upload--icon"
              alt="upload_icon"
            />
          </label>
        </div>
        <div className="updateplaylist--stats--info">
          <input
            type="text"
            id="playlisttitle"
            placeholder="Playlist Name"
            value={playlistName}
            onChange={handlePlaylistName}
          />
          <div className="updateplaylist--release--info">
            {/* <h5>2014</h5> */}
            {/* <h6>PLAYLIST</h6> */}
          </div>
          {/* <h4>Creator Username</h4> */}
        </div>
      </div>

      <div className="updateplaylist--addsongs">
        <div className="updateplaylist--searchbar">
          {/* <input type="text" id="searchbar" placeholder="Search Songs"/> */}
          <div className="updateplaylist--createbtn">
            <input
              type="submit"
              value="Update"
              className="updateplaylist--gradient--btn updateplaylist--submit--btn"
              onClick={handleSubmit}
            />
          </div>
          <div className="updateplaylist--delbtn">
            <input
              type="submit"
              value="Delete"
              className="updateplaylist--gradient--btn updateplaylist--submit--btn delbtn"
              onClick={handleDelete}
            />
          </div>
          <input
            type="button"
            value="Add Songs"
            className="updateplaylist--gradient--btn updateplaylist--addsongsbtn"
            onClick={togglePop}
          />
          <div className="updateplaylist--addedsongs"></div>
        </div>

        <div className="updateplaylist--songs">
          {playlistSongList &&
            playlistSongList?.map((item, index) => {
              return (
                <PlaylistSong
                  key={index}
                  {...item}
                  song={item}
                  index={index}
                  handleActionSong={handleActionSong}
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
