import React from "react";
import { Link } from "react-router-dom";

import "./App.scss";

const NavBar = () => {
  const token = localStorage.getItem("accessToken");

  return (
    <div>
      {token && <Link to="/profile">Profile</Link>}

      <Link to="/chat">Chat</Link>
    </div>
  );
};

export default NavBar;
