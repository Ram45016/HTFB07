// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
    return (
        <div className="header" style={{backgroundColor:"black"}}>
            <h1 className="header-title">Track And Trust</h1>
            <ul className="header-nav">
                <li><Link to="/Explore" style={{top:"2%"}}>Explore</Link></li>
                <li><Link to="/UploadDataset">Upload</Link></li>
                <li><Link to="/Datalease">Data Leasing</Link></li>
                <li><Link to="/LeasedData">Leased Data</Link></li>
            </ul>
        </div>
    );
};

export default Header;
