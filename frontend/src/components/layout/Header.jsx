// src/components/layout/Header.jsx
import { LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useUserProfile } from "../../services/useUserProfile";

export default function Header() {
   const { user, logout } = useAuth();
   const { isDark, toggleTheme } = useTheme();
const { profile, loading } = useUserProfile(user?.id);
const displayName = profile?.username || user?.email?.split("@")[0] || "Usuario";
const avatarUrl = profile?.profilePicture || null;

   return (
      <header className="p-4 bg-gray-800 border-b border-gray-700 sticky top-0 z-20">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>

            <div className="flex items-center gap-4">
               {/* profile Info */}
               <div className="flex items-center gap-3">
                  <div className="text-right">
                     <p className="text-sm font-medium text-white">
                        {profile?.username || profile?.email || "Usuario"}
                     </p>
                     <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {profile?.role || "visitante"}
                     </p>
                  </div>
                  <div className=" shrink-0 w-10 h-10  bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
{avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="flex-shrink-0 w-10 h-10 rounded-full object-cover ring-4 ring-gray-700 shadow-lg transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                }}
              />
            ) : (
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg ring-4 ring-gray-700 shadow-lg">
                {displayName[0].toUpperCase()}
              </div>
            )}
                  </div>
               </div>

               {/* Dark Mode Toggle */}
               <button
                  onClick={toggleTheme}
                  className="hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  aria-label="Toggle dark mode">
                  {isDark ? (
                     <Sun className="w-5 h-5" />
                  ) : (
                     <Moon className="w-5 h-5" />
                  )}
               </button>

               {/* Logout */}
               <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition">
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
               </button>
            </div>
         </div>
      </header>
   );
}


// import { useAuth } from "@/context/AuthContext";
// import { useUserProfile } from "../../services/useUserProfile";

// export default function DashboardHeader() {
//   const { profile } = useAuth();
//   const { user, loading } = useUserProfile(profile?.id);
// console.log(user);
//   return (
//     <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-white">Dashboard</h1>

//         <div className="flex items-center gap-4">
//           <div className="text-right">
//             <p className="text-sm font-medium text-white">{user?.username || "Usuario"}</p>
//             <p className="text-xs text-gray-400">{user?.role || "visitante"}</p>
//           </div>

//           <div className="relative">
//             {user?.profilePicture ? (
//               <img
//                 src={user.profilePicture}
//                 alt={user.username}
//                 className="w-12 h-12 rounded-full object-cover ring-4 ring-gray-700 shadow-lg"
//                 onError={(e) => {
//                   e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
//                 }}
//               />
//             ) : (
//               <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg ring-4 ring-gray-700 shadow-lg">
//                 {user?.username?.[0].toUpperCase() || "U"}
//               </div>
//             )}
//             {/* Punto verde si está activo (si tienes ese dato) */}
//             <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full ring-4 ring-gray-800"></span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }