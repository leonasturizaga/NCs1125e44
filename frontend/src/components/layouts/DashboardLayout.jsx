// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import MainContent from "./MainContent";

// export default function DashboardLayout({ children }) {
//    return (
//       <div className="min-h-screen bg-gray-50 flex">
//          {/* Sidebar – fixed on desktop, collapsible on mobile */}
//          <Sidebar />

//          {/* Main panel */}
//          <div className="flex-1 flex flex-col">
//             <Header />

//             {/* Scrollable content */}
//             {/* <main className="flex-1 p-6 overflow-y-auto">{children}</main> */}

//             {/* Page content */}
//             <main className="flex-1 p-6">
//           <MainContent>{children}</MainContent>
//         </main>
//          </div>
//       </div>
//    );
// }


//------------ version 1 ----------------
// src/components/layout/DashboardLayout.jsx
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import TestimonialsList from "../../features/testimonials/pages/TestimonialsList";

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <TestimonialsList />
//         <main className="flex-1 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


//------------ version 2 ----------------
// src/components/layout/DashboardLayout.jsx   con context
// Ubicación: src/components/layouts/DashboardLayout.jsx

import Sidebar from "./Sidebar";
import Header from "./Header";
// 💡 Solo necesitamos Outlet para renderizar la página hija
import { Outlet } from 'react-router-dom'; 

// 🛑 ¡ELIMINAR ESTAS LÍNEAS! El Layout no debe importar páginas
// import DashboardPage from "../../features/dashboard/pages/DashboardPage.jsx";
// import SettingsPage from "../../features/settings/pages/SettingsPage.jsx";
// import { useLayout } from "../../context/LayoutContext"; 
// const pageComponents = { ... }; 


export default function DashboardLayout() {
  // 🛑 ELIMINAR: const { currentPage } = useLayout();

  return (
    <div className="min-h-screen bg-gray-900 flex text-gray-100"> 
      {/* 1. SIDEBAR */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* 2. HEADER/NAVBAR */}
        <Header />
        
        {/* 3. CONTENIDO PRINCIPAL: Manejado por el Router */}
        <main className="flex-1 p-6">
          <Outlet /> {/* ⬅️ ESTE ES EL PASO CRÍTICO: RENDERIZA LA PÁGINA */}
        </main>
      </div>
    </div>
  );
}