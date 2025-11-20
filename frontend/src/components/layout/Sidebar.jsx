//----------------- version 1 Sidebar.jsx
// import { Home, MessageSquare, Settings, LogOut } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
//       <div className="p-6">
//         <h1 className="text-2xl font-bold text-indigo-600">Testimonial CMS</h1>
//       </div>

//       <nav className="flex-1 px-4">
//         <ul className="space-y-2">
//           <li>
//             <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium">
//               <Home className="w-5 h-5" />
//               Dashboard
//             </a>
//           </li>
//           <li>
//             <a href="/testimonials" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
//               <MessageSquare className="w-5 h-5" />
//               Testimonios
//             </a>
//           </li>
//           <li>
//             <a href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
//               <Settings className="w-5 h-5" />
//               Configuración
//             </a>
//           </li>
//         </ul>
//       </nav>

//       <div className="p-4 border-t">
//         <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
//           <LogOut className="w-5 h-5" />
//           Cerrar sesión
//         </button>
//       </div>
//     </aside>
//   );
// }


//----------------- version 1 Sidebar.jsx --------------------------
// src/components/layout/Sidebar.jsx
// import { NavLink } from "react-router-dom";
// import { Home, MessageSquare, Settings, LogOut } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
//       <div className="p-6 border-b">
//         <h1 className="text-2xl font-bold text-indigo-600">Testimonial CMS</h1>
//       </div>
//       <nav className="p-4 space-y-2">
//         <NavLink
//           to="/dashboard"
//           className={({ isActive }) =>
//             `block px-4 py-3 rounded-lg ${isActive ? "bg-indigo-100 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-100"}`
//           }
//         >
//           <Home className="inline w-5 h-5 mr-3" />
//           Dashboard
//         </NavLink>

//         <NavLink
//           to="/testimonials"
//           className={({ isActive }) =>
//             `block px-4 py-3 rounded-lg ${isActive ? "bg-indigo-100 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-100"}`
//           }
//         >
//           <MessageSquare className="inline w-5 h-5 mr-3" />
//           Testimonios
//         </NavLink>

//         <NavLink
//           to="/settings"
//           className={({ isActive }) =>
//             `block px-4 py-3 rounded-lg ${isActive ? "bg-indigo-100 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-100"}`
//           }
//         >
//           <Settings className="inline w-5 h-5 mr-3" />
//           Configuración
//         </NavLink>
//       </nav>
//     </aside>
//   );
// }

//----------------- version 2 Sidebar.jsx --------------------------
// src/components/layout/Sidebar.jsx   with context
import { Home, MessageSquare, Settings, LogOut } from "lucide-react";
import { useLayout } from "../../context/LayoutContext";

export default function Sidebar() {
  const { currentPage, setCurrentPage } = useLayout();

  const navItemClass = (page) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition cursor-pointer ${
      currentPage === page
        ? "bg-indigo-100 text-indigo-700"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-indigo-600">Testimonial CMS</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <div onClick={() => setCurrentPage("dashboard")} className={navItemClass("dashboard")}>
          <Home className="w-5 h-5" />
          Dashboard
        </div>

        <div onClick={() => setCurrentPage("testimonials")} className={navItemClass("testimonials")}>
          <MessageSquare className="w-5 h-5" />
          Testimonios
        </div>

        <div onClick={() => setCurrentPage("settings")} className={navItemClass("settings")}>
          <Settings className="w-5 h-5" />
          Configuración
        </div>
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}