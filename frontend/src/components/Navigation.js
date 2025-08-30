import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCar, FaPlus, FaList, FaHome, FaBars, FaTimes } from "react-icons/fa";
import "./Navigation.css";

/**
 * Navigation Component - Provides responsive navigation for the Car Management System
 * Updated for React Router v6 compatibility
 * Features mobile-friendly hamburger menu and active route highlighting
 */
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  /**
   * Toggles the mobile menu visibility
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Closes the mobile menu when a link is clicked
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      {/* Brand Logo */}
      <div className="nav-brand">
        <FaCar className="brand-icon" />
        <span className="brand-text">AutoManager</span>
      </div>

      {/* Hamburger Menu Button (Mobile Only) */}
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? "nav-links-active" : ""}`}>
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={closeMenu}
          >
            <FaHome className="nav-icon" />
            <span className="nav-text">Home</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/cars"
            className={`nav-link ${
              location.pathname === "/cars" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <FaList className="nav-icon" />
            <span className="nav-text">View Cars</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/add-car"
            className={`nav-link ${
              location.pathname === "/add-car" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <FaPlus className="nav-icon" />
            <span className="nav-text">Add Car</span>
          </Link>
        </li>
      </ul>

      {/* User Profile (Placeholder for future expansion) */}
      <div className="nav-user">
        <div className="user-avatar">
          <span className="user-initials">CM</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
