import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const Menu = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext); // Use user and logout

  const getActiveClass = (path) => {
    return location.pathname === path ? "menu selected" : "menu";
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = 'http://localhost:3000'; // Redirect to landing page
  }

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li><Link style={{ textDecoration: "none" }} to="/"><p className={getActiveClass("/")}>Dashboard</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/orders"><p className={getActiveClass("/orders")}>Orders</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/holdings"><p className={getActiveClass("/holdings")}>Holdings</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/positions"><p className={getActiveClass("/positions")}>Positions</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/funds"><p className={getActiveClass("/funds")}>Funds</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/apps"><p className={getActiveClass("/apps")}>Apps</p></Link></li>
        </ul>
        <hr />
        {user && (
            <div className="profile" onClick={handleLogout} style={{cursor: "pointer"}}>
              <div className="avatar">{user.username.substring(0, 2).toUpperCase()}</div>
              <p className="username">{user.username}</p>
              <small>Click to logout</small>
            </div>
        )}
      </div>
    </div>
  );
};
export default Menu;