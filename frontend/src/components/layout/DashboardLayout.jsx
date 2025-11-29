// src/components/layouts/DashboardLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom'; // 💡 NECESARIO para que el router anidado funcione
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLayout } from "../../context/LayoutContext";

import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import SettingsPage from "../../features/settings/pages/SettingsPage";
import TestimonialList from "../../features/testimonials/pages/TestimonialList";
import UserList from "../../features/users/pages/UserList";
import HomeVisitante from "../../features/home/HomeVisitante";

const pageComponents = {
   dashboard: <DashboardPage />,
  users: <UserList />,
  testimonials: <TestimonialList />,
  settings: <SettingsPage />,
  home: <HomeVisitante />,
};

export default function DashboardLayout() {
    // 🛑 ELIMINAR: const { currentPage } = useLayout();

    return (
        // 1. layout-root: Fondo oscuro de toda la app
        <div className="flex min-h-screen bg-gray-900"> 
            
            {/* 2. Sidebar Fija */}
            <div className={`fixed inset-y-0 left-0 z-30 ${SIDEBAR_WIDTH}`}>
                <Sidebar />
            </div>

            {/* 3. layout-main: Contenedor Principal (ajustado con margen) */}
            <div 
                className="flex-1 flex flex-col transition-all duration-300" 
                style={{ marginLeft: '16rem' }} // Margen para compensar la Sidebar
            >
                <Header />
                
                {/* 4. layout-content: Área de Contenido Principal */}
                <main className="flex-1 p-8"> 
                    
                    {/* 5. layout-container: Renderiza la página hija */}
                    <div className="w-full h-full"> 
                        
                        {/* 💡 IMPLEMENTACIÓN CRÍTICA: El Router decide qué mostrar */}
                        <Outlet /> 
                        
                    </div>
                </main>
            </div>
        </div>
    );
}