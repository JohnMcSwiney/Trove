import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("TroveAdminToken");
    fetch("/api/admins/logout").then(() => {
      navigate("/");
      window.location.reload(false);
    });
  };
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <span className="brand-name fs-4">Trove Music for Admin</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <NavLink
          className="list-group-item py-2"
          to={"/dashboard"}
          activeClassName="active"
        >
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          className="list-group-item py-2"
          to={"/user"}
          activeClassName="active"
        >
          <span>Users</span>
        </NavLink>

        <NavLink
          className="list-group-item py-2"
          to={"/artist"}
          activeClassName="active"
        >
          <span>Artist</span>
        </NavLink>

        <NavLink
          className="list-group-item py-2"
          to={"/song"}
          activeClassName="active"
        >
          <span>Songs</span>
        </NavLink>

        <NavLink
          className="list-group-item py-2"
          to={"/album"}
          activeClassName="active"
        >
          <span>Albums</span>
        </NavLink>

        <NavLink
          className="list-group-item py-2"
          to={"/ep"}
          activeClassName="active"
        >
          <span>EPs</span>
        </NavLink>

        <NavLink
          className="list-group-item py-2"
          to={"/collection"}
          activeClassName="active"
        >
          <span>Collections</span>
        </NavLink>

        <NavLink
          className="list-group-item py-2"
          to={"/admin"}
          activeClassName="active"
        >
          <span>Request Musics</span>
        </NavLink>

        <button className="btn btn-dark mt-3" onClick={handleSignout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
