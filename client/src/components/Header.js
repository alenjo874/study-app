import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div id="headerdiv">
      <div className="navlink">
        <NavLink to="/">
          <h1 className="navElement">studia</h1>
        </NavLink>
      </div>
      <div className="line"></div>
      <div id="navbar">
        <div className="navlink">
          <NavLink to="/studysessions">
            <h2 className="navElement">study sessions</h2>
          </NavLink>
        </div>
        <div className="navlink">
          <NavLink to="/createsession">
            <h2 className="navElement">new study session</h2>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
