import React from 'react';
import './Header.css';
import logo from './images/Jobzz_logo128x128.png';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Jobzz Logo" className="logo" />
        </div>
        <div className="title-container">
          <h1>X-Ray Hunt</h1>
        </div>
        <div className="contacts-container">
          <a href="https://www.linkedin.com/in/vladislav-leshkov/" className="contacts-link" target="_blank" rel="noopener noreferrer">Contacts</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
