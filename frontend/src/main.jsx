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
import AppRouter from "./app/router.jsx"; // ← exact path
import { LayoutProvider } from "./context/LayoutContext";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";  // ← IMPORT TOASTIFY
import "react-toastify/dist/ReactToastify.css";   // ← REQUIRED STYLE
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <ThemeProvider>
         <AuthProvider>
            <LayoutProvider>
               <ToastContainer position="top-right" />
               <AppRouter />
            </LayoutProvider>
         </AuthProvider>
      </ThemeProvider>
   </React.StrictMode>
);
