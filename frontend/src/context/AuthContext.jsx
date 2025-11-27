// src/context/AuthContext.jsx
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/apiClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("https://n-cs1125e44.vercel.app/auth/login", { email, password });

      if (res.data.success) {
        const token = res.data.token;           // ← your real format
        const userData = res.data.user || { email }; // fallback

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(userData);
        console.log("Login successful:", userData);
        return true;
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};