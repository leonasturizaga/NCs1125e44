// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/apiClient";
import {jwtDecode} from "jwt-decode";   // ← NAMED IMPORT (no curly braces!)

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const cleanToken = (token) => {
  if (!token) return null;

  // elimina BOM y espacios ocultos
  return token.replace(/^\uFEFF/, "").trim();
};


  const decodeToken = (token) => {
  try {
    if (!token || token === "undefined" || token === "null" || token.trim() === "")
      return null;

    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email || null,
      username: decoded.username || null,
    };
  } catch (err) {
    console.error("Invalid token");
    return null;
  }
};


  // Restore session
useEffect(() => {
  let token = localStorage.getItem("token");
  token = cleanToken(token);

  if (token) {
    const userData = decodeToken(token);
    if (userData) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(userData);
    }
  }
  setLoading(false);
}, []);



  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.success && res.data.token) {
        const token = cleanToken(res.data.token);
        const userData = decodeToken(token);

        if (userData) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData));
          api.defaults.headers.Authorization = `Bearer ${token}`;
          setUser(userData);
          return true;
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
    return false;
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