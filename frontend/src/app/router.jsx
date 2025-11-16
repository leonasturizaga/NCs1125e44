import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}