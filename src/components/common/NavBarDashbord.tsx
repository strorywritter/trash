import React, { useContext, useState, useEffect } from "react";
import { MenuContext } from "../context/MenuContext";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import "../assets/css/style1.css";
import "../assets/css/core.css";
import "../assets/css/icon-font.css";

const NavBarDashbord: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useContext(MenuContext);
  const [user] = useContext(UserContext);
  const history = useHistory();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="header">
      <div className="header-left">
        <div className="menu-icon ti ti-menu-alt" onClick={toggleMenu}></div>
      </div>
    </div>
  );
};

export default NavBarDashbord;
