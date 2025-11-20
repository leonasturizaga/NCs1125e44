//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
// src/app/router.jsx
import { createBrowserRouter } from 'react-router-dom';

/*export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}*/


// Asegúrate de que esta línea esté exportando el router
export const router = createBrowserRouter([
  // RUTA DE LOGIN: Debe coincidir con '/login'
  {
    path: '/login',
    element: <LoginPage />, // <-- Debe usar el componente importado
    errorElement: <NotFound />,
  },
  
  // Ruta Principal (Raíz)
  {
    path: '/',
    element: <Dashboard />, 
    errorElement: <NotFound />,
  },
]);