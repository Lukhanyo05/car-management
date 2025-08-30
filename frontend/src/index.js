import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/**
 * Index.js - The entry point of the React application
 * 
 * This file:
 * - Renders the root React component into the DOM
 * - Sets up any global configurations
 */

// Create root element and render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);