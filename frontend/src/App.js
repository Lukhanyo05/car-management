import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import CarList from "./components/CarList";
import CarForm from "./components/CarForm";
import Home from "./components/Home";
import "./App.css";

/**
 * Main App Component - The root component of the Car Management System
 * Sets up routing and provides the overall layout structure
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cars"
              element={
                <div className="page-container">
                  <CarList />
                </div>
              }
            />
            <Route
              path="/add-car"
              element={
                <div className="page-container">
                  <CarForm />
                </div>
              }
            />
            <Route
              path="/edit-car/:id"
              element={
                <div className="page-container">
                  <CarForm isEditing={true} />
                </div>
              }
            />
            <Route
              path="*"
              element={
                <div className="page-container">
                  <div className="not-found">
                    <h2>404 - Page Not Found</h2>
                    <p>The page you're looking for doesn't exist.</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="footer-content">
            <p>
              &copy; {new Date().getFullYear()} AutoManager - Car Management
              System
            </p>
            <p>Built with React & Express for HyperionDev Full Stack Course</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
