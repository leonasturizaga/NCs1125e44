// src/App.jsx
import React from 'react';
// Importamos el router central que crearemos
import { RouterProvider } from 'react-router-dom';
//import { router } from './app/router'; // Asegúrate de que esta ruta sea correcta
import LoginPage from "./features/auth/pages/LoginPage.jsx";


function App() {
  return <LoginPage />;
}
export default App;