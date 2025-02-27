import React from 'react';
import '../styles/Header.css';

const Header = () => (
  <header className="header">
    <div className="logo">
      <img src="https://via.placeholder.com/150x50" alt="Kanban Board Logo" />
      <h1>Kanban Board</h1>
    </div>

    <nav>
      <ul className="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>

    <div className="header-actions">
      <input type="text" placeholder="Search..." className="search-bar" />
      <button className="sign-in-btn">Sign In</button>
    </div>
  </header>
);

export default Header;
