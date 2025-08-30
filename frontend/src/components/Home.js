import React from "react";
import { Link } from "react-router-dom";
import { FaCar, FaPlus, FaList, FaChartLine } from "react-icons/fa";
import "./Home.css";

/**
 * Home Component - Welcome page for the AutoManager application
 * Provides an overview and quick access to main features
 */
const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-highlight">AutoManager</span>
          </h1>
          <p className="hero-subtitle">
            Your complete solution for managing car inventory with ease and
            precision
          </p>
          <div className="hero-actions">
            <Link to="/cars" className="btn btn-primary btn-large">
              <FaList /> View All Cars
            </Link>
            <Link to="/add-car" className="btn btn-secondary btn-large">
              <FaPlus /> Add New Car
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="car-silhouette">
            <FaCar className="car-icon" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to manage your car inventory effectively</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaPlus />
            </div>
            <h3>Add Cars</h3>
            <p>Easily add new cars to your inventory with our intuitive form</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaList />
            </div>
            <h3>View Inventory</h3>
            <p>Browse your complete car inventory with detailed information</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaChartLine />
            </div>
            <h3>Track Data</h3>
            <p>Monitor your inventory with comprehensive data tracking</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-header">
          <h2>Why Choose AutoManager?</h2>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Reliable</div>
          </div>

          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Available</div>
          </div>

          <div className="stat-item">
            <div className="stat-number">Easy</div>
            <div className="stat-label">To Use</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>
            Join thousands of satisfied users managing their car inventory with
            AutoManager
          </p>
          <Link to="/add-car" className="btn btn-primary btn-large">
            Add Your First Car
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
