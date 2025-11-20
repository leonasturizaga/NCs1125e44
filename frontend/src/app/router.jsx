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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import ProtectedLayout from "../components/layout/ProtectedLayout";

// Placeholder pages (create these later — for now just simple components)
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import TestimonialsList from "../features/testimonials/pages/TestimonialsList";
import SettingsPage from "../features/settings/pages/SettingsPage";
import HomeVisitante from "../features/home/HomeVisitante";
import CreateTestimonial from "../features/testimonials/pages/CreateTestimonial";
import EditTestimonial from "@/features/testimonials/pages/EditTestimonial";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route – NO layout */}
        <Route path="/" element={<HomeVisitante />} />
        <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/testimonials" element={<TestimonialsList />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/testimonials/create" element={<CreateTestimonial />} />
          <Route path="/testimonials/edit/:id" element={<EditTestimonial />} />
        {/* Protected routes – WITH DashboardLayout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/testimonials" element={<TestimonialsList />} />
          <Route path="/settings" element={<SettingsPage />} /> 
          <Route path="/testimonials/create" element={<CreateTestimonial />} />
          <Route path="/testimonials/edit/:id" element={<EditTestimonial />} />
         

          {/* Optional: redirect root after login */}
          <Route path="*" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}