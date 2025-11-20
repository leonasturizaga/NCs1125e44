//------------- version 0 --------------------------
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './app/App.jsx'   
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App /> 
//   </React.StrictMode>,
// )


//------------- version 1 --------------------------
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./app/Router.jsx";   // ← exact path
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);