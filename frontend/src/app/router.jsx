//------------- version original --------------------------
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { LoginPage } from "../features/auth/pages/LoginPage";

// export function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


//------------- version 1 --------------------------
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { LoginPage } from "../features/auth/pages/LoginPage";
// import ProtectedLayout from "../components/layout/ProtectedLayout";

// // Placeholder pages (create these later — for now just simple components)
// import DashboardPage from "../features/dashboard/pages/DashboardPage";
// import TestimonialsList from "../features/testimonials/pages/TestimonialsList";
// import SettingsPage from "../features/settings/pages/SettingsPage";
// import HomeVisitante from "../features/home/HomeVisitante";
// import CreateTestimonial from "../features/testimonials/pages/CreateTestimonial";
// import EditTestimonial from "@/features/testimonials/pages/EditTestimonial";

// export function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public route – NO layout */}
//         <Route path="/" element={<HomeVisitante />} />
//         <Route path="/login" element={<LoginPage />} />
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/testimonials" element={<TestimonialsList />} />
//           <Route path="/settings" element={<SettingsPage />} />
//           <Route path="/testimonials/create" element={<CreateTestimonial />} />
//           <Route path="/testimonials/edit/:id" element={<EditTestimonial />} />
//         {/* Protected routes – WITH DashboardLayout */}
//         <Route element={<ProtectedLayout />}>
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/testimonials" element={<TestimonialsList />} />
//           <Route path="/settings" element={<SettingsPage />} /> 
//           <Route path="/testimonials/create" element={<CreateTestimonial />} />
//           <Route path="/testimonials/edit/:id" element={<EditTestimonial />} />
         

//           {/* Optional: redirect root after login */}
//           <Route path="*" element={<DashboardPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

//------------- version 2 --------------------------
// src/app/router.jsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Layout
// import DashboardLayout from "../components/layout/DashboardLayout";

// // Pages
// import HomeVisitante from "../features/home/HomeVisitante";
// import {LoginPage} from "../features/auth/pages/LoginPage";
// import DashboardPage from "../features/dashboard/pages/DashboardPage";
// import TestimonialsList from "../features/testimonials/pages/TestimonialsList";
// import SettingsPage from "../features/settings/pages/SettingsPage";
// import CreateTestimonial from "../features/testimonials/pages/CreateTestimonial";
// import EditTestimonial from "@/features/testimonials/pages/EditTestimonial";

// export function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public */}
//         <Route path="/" element={<HomeVisitante />} />
//         <Route path="/login" element={<LoginPage />} />

//         {/* ALL PROTECTED ROUTES — BUT WITHOUT AUTH CHECK (for now) */}
//         <Route element={<DashboardLayout />}>
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/testimonials" element={<TestimonialsList />} />
//           <Route path="/testimonials/create" element={<CreateTestimonial />} />
//           <Route path="/testimonials/edit/:id" element={<EditTestimonial />} />
//           <Route path="/settings" element={<SettingsPage />} />

//           {/* Default */}
//           <Route index element={<Navigate to="/dashboard" replace />} />
//           <Route path="*" element={<DashboardPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

//------------- version 3 --------------------------
// src/app/Router.jsx   (name router.jsx change from Router.jsx)
// src/app/router.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";

// Public
import HomeVisitante from "../features/home/HomeVisitante";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

// Admin pages
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import TestimonialsList from "../features/testimonials/pages/TestimonialsList";
import SettingsPage from "../features/settings/pages/SettingsPage";
import CreateTestimonial from "../features/testimonials/pages/CreateTestimonial";
import EditTestimonial from "../features/testimonials/pages/EditTestimonial";
import TestimonialList from "../features/testimonials/pages/TestimonialsList";
import ProtectedRoute from "../components/ProtectedRoute";
import AboutPage from "../features/about/pages/AboutPage";

export default function AppRouter() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<HomeVisitante />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* A PARTIR DE AQUÍ DEBE SEGUIR LA ESTRUCTURA ORIGINAL DE RUTAS PROTEGIDAS */}
<Route element={<ProtectedRoute />}>
               {/* ALL PROTECTED ROUTES INSIDE LAYOUT */}
               <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/testimonials" element={<TestimonialList />} />
                  <Route path="/testimonials/create" element={<CreateTestimonial />} />
                  <Route path="/testimonials/edit/:id" element={<EditTestimonial />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
               </Route>
            </Route>
         </Routes>
      </BrowserRouter>
   );
}
