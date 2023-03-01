import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RouteName } from "../../RouteName";
import "../assets/css/style1.css";
import "../assets/css/core.css";
import "../assets/css/icon-font.css";
import { MenuContext } from "../context/MenuContext";

import logoImage from "../../components/assets/images/Logo.svg";
import Dashboard from '../admin/Dashboard';

const CustomerAdminSideMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useContext(MenuContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className={isMenuOpen ? 'left-side-bar open sideColor' : 'left-side-bar sideColor'}>
      <div className="brand-logo">
             <div className="d-flex justify-content-center mb-5">
             <img src={logoImage} className="brand-logo-text d-flex justify-content-center align-items-center mt-5  me-5"/>
             </div>
                <div className="close-sidebar" onClick={toggleMenu}>
                    <i className="ion-close-round"></i>
                </div>
            </div>
  
      <div className="menu-block scrollSideBar mt-4">
        <div className="sidebar-menu">
          <ul id="accordion-menu">
            <li>
              <NavLink to={RouteName.CUSTOMER_ADMIN_DASHBOARD} onClick={toggleMenu} className={location.pathname == RouteName.CUSTOMER_ADMIN_DASHBOARD ? "dropdown-toggle selected-side no-arrow" : "dropdown-toggle no-arrow"}>
                <span className={location.pathname == RouteName.CUSTOMER_ADMIN_DASHBOARD ? "micon dw dw-home selected-side" : "micon dw dw-home"} ></span>
                <span className="mtext">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={RouteName.CUSTOMER_ADMIN_ALL_DEALS} onClick={toggleMenu} className={location.pathname == RouteName.CUSTOMER_ADMIN_ALL_DEALS ? "dropdown-toggle selected-side no-arrow" : "dropdown-toggle no-arrow"}>
                <span className={location.pathname == RouteName.CUSTOMER_ADMIN_ALL_DEALS ? "micon dw dw-table selected-side" : "micon dw dw-table"} ></span>
                <span className="mtext">All Requests</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={RouteName.CUSTOMER_ADMIN_SUBSCRIPTION} onClick={toggleMenu} className={location.pathname == RouteName.CUSTOMER_ADMIN_SUBSCRIPTION ? "dropdown-toggle selected-side no-arrow" : "dropdown-toggle no-arrow"}>
                <span className={location.pathname == RouteName.CUSTOMER_ADMIN_SUBSCRIPTION ? "micon dw dw-credit-card selected-side" : "micon dw dw-credit-card"} ></span>
                <span className="mtext">All Acitive Requests</span>
              </NavLink>
            </li>
          </ul>
          <ul id="logout_sidebar_button" >
            <li>
              
              <a href="/login" className="dropdown-toggle no-arrow cursor-pointer">
              <span className="micon dw dw-logout"></span>
                <span className="mtext">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerAdminSideMenu;
