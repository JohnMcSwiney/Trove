import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <span className="brand-name fs-4">Trove Music for Admin</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <NavLink
          className="list-group-item py-2"
          to={"/"}
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
          <span>Admin</span>
        </NavLink>

        <button className="btn btn-dark mt-3">Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
