import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div id="headerdiv">
      <div className="navlink">
        <Link to="/">
          <h1 className="navElement">studia</h1>
        </Link>
      </div>
      <div className="line"></div>
      <div id="navbar">
        <div className="navlink">
          <Link to="/studysessions">
            <h2 className="navElement">study sessions</h2>
          </Link>
        </div>
        <div className="navlink">
          <Link to="/createsession">
            <h2 className="navElement">new study session</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
