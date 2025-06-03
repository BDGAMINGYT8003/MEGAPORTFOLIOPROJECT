// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/theme.css'; // Import theme first
import './styles/global.css'; // Then global styles
import './styles/effects.css'; // Then effects

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
