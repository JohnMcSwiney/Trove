import React from "react";

import "./style.css";
import { NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <span className="brand-name fs-4">Trove Music for Admin</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <NavLink className="list-group-item py-2" to={"/"}>
          <span>Dashboard</span>
        </NavLink>
        <NavLink className="list-group-item py-2" to={"/user"}>
          <span>Users</span>
        </NavLink>

        <NavLink className="list-group-item py-2" to={"/artist"}>
          <span>Artist</span>
        </NavLink>

        <NavLink className="list-group-item py-2" to={"/song"}>
          <span>Songs</span>
        </NavLink>

        <NavLink className="list-group-item py-2" to={"/album"}>
          <span>Albums</span>
        </NavLink>
        {/* <i className="bi bi-people fs-5 me-3"></i> */}
        <NavLink className="list-group-item py-2" to={"/ep"}>
          <span>EPs</span>
        </NavLink>

        <NavLink className="list-group-item py-2" to={"/collection"}>
          <span>Collections</span>
        </NavLink>

        <button className="btn btn-dark">Logout</button>
      </div>
    </div>
  );
}
export default Sidebar;
