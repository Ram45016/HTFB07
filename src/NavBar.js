// Header.js

import React from 'react';
import './NavBar.css'; // Import the CSS file

function Header() {
  return (
    <div className="header">
      <h1>Supply Chain Analytics</h1>
      
      <nav>
        <ul className="nav-links">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Insights</a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Activity</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
