import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";
import Album from "../album/Album";
import DasCard from "../../components/dashboard card/DasCard";
import "./dashboard.css";

import { RiUserSmileFill, RiAlbumFill } from "react-icons/ri";
import { GiLoveMystery, GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { TbAlbum } from "react-icons/tb";

function DashBoard() {
  const [users, setUsers] = React.useState([]);
  const [usersData, setUserData] = React.useState([]);
  const [errors, setErrors] = React.useState(null);
  const allUsers = React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrors(json.error);
        return;
      }

      if (response.ok) {
        setUsers(json.users);
        setUserData(json);
      }
    };
    fetchUsers();
  }, []);

  console.log(usersData.changeType);
  const [songs, setSongs] = React.useState([]);

  const allSongs = React.useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/songs", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrors(json.error);
        return;
      }

      if (response.ok) {
        setSongs(json);
      }
    };
    fetchSongs();
  }, []);

  const [eps, setEPs] = React.useState([]);

  const allEPs = React.useEffect(() => {
    const fetchEPs = async () => {
      const response = await fetch("/api/eps", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrors(json.error);
        return;
      }

      if (response.ok) {
        setEPs(json);
      }
    };
    fetchEPs();
  }, []);

  const [albums, setAlbums] = React.useState([]);
  const [albumsData, setAlbumsData] = React.useState([]);
  const allAlbums = React.useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch("/api/albums", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrors(json.error);
        return;
      }

      if (response.ok) {
        setAlbums(json.albums);
        setAlbumsData(json);
      }
    };
    fetchAlbums();
  }, []);

  const [artists, setArtist] = React.useState([]);

  const allArtists = React.useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch("/api/artists", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrors(json.error);
        return;
      }

      if (response.ok) {
        setArtist(json);
      }
    };
    fetchAlbums();
  }, []);
  const dashboardCard = [
    {
      header: "Users",
      total: users.length,
      subtitle: "Total Users",
      percentageChange: usersData.percentageChange,
      new: usersData.totalDiff,
      changeType: usersData.changeType,
      url: "/user",
      icon: <RiUserSmileFill />,
      unit: "Users",
    },
    {
      header: "Artists",
      total: artists.length,
      subtitle: "Total Artists",
      url: "/artist",
      icon: <GiMusicalNotes />,
      unit: "Artists",
    },
    {
      header: "Songs",
      total: songs.length,
      subtitle: "Total Songs",
      url: "/song",
      icon: <GiLoveMystery />,
      unit: "Songs",
    },
    {
      header: "Albums",
      total: albums.length,
      subtitle: "Total Albums",
      percentageChange: albumsData.percentageChange,
      changeType: albumsData.changeType,
      url: "/album",
      icon: <RiAlbumFill />,
      unit: "Albums",
    },
    {
      header: "EPs",
      total: eps.length,
      subtitle: "Total EPs",
      url: "/ep",
      icon: <TbAlbum />,
      unit: "EPs",
    },
    // { header: "Collections", total: .length, url: "/ep", icon: "" },
  ];

  return (
    <div className="">
      <h1>DashBoard</h1>

      <div className="dashboard-cards">
        {dashboardCard.map((data) => (
          <DasCard data={data} />
        ))}
      </div>
    </div>
  );
}

export default DashBoard;
