import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path ? "menu selected" : "menu";
  };

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/">
              <p className={getActiveClass("/")}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders">
              <p className={getActiveClass("/orders")}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings">
              <p className={getActiveClass("/holdings")}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions">
              <p className={getActiveClass("/positions")}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds">
              <p className={getActiveClass("/funds")}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps">
              <p className={getActiveClass("/apps")}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={() => {}}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
