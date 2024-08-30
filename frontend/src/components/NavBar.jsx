import React from 'react';
import './NavBar.css';
import { logoutAccount } from '../services/accounts';

function NavBar({ openInstructions, openAbout, userEmail, onLogout }) {
  const handleLogout = (e) => {
    e.preventDefault();
    logoutAccount();
    onLogout();
  };

  return (
    <div className="navbar">
      {userEmail && (
        <div className="user-info">
          <span className="user-email">{userEmail}</span>
        </div>
      )}
      <div className="nav-links">
        {userEmail && (
          <a href="#" onClick={handleLogout} className="nav-link">Log Out</a>
        )}
        <a href="#" onClick={(e) => { e.preventDefault(); openInstructions(); }} className="nav-link">Instructions</a>
        <a href="#" onClick={(e) => { e.preventDefault(); openAbout(); }} className="nav-link">About</a>
      </div>
    </div>
  );
}

export default NavBar;