import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';  // Create this CSS file for the Navbar styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">My Blog</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">All Posts</Link>
        </li>
        <li>
          <Link to="/create">Create Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
