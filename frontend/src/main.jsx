
// frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// 💡 CORRECCIÓN: Apunta a la ubicación correcta del archivo App.jsx
import App from './app/App.jsx'; 
import './shared/styles/global.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);