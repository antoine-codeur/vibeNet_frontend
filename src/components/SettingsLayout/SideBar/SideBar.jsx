import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';
import { AuthContext } from '../../../context/AuthContext';

const SideBar = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <h3>Settings</h3>
      <ul>
        <li>
          <NavLink 
            to="/settings/profile" 
            className={({ isActive }) => (isActive ? 'active' : '')}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/settings/blog" 
            className={({ isActive }) => (isActive ? 'active' : '')}>
            Blog
          </NavLink>
        </li>
        </ul>
        <hr/>
        {/* Logout link */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
    </div>
  );
};

export default SideBar;