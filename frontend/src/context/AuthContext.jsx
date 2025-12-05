//---------------- version 1 ----------------
// src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import api from "@/services/apiClient";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Restore session on load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");
//     if (token && savedUser) {
//       api.defaults.headers.Authorization = `Bearer ${token}`;
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const res = await api.post("/auth/login", { email, password });

//       if (res.data.success) {
//         const token = res.data.token;           // ← your real format
//         const userData = res.data.user || { email }; // fallback

//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(userData));

//         api.defaults.headers.Authorization = `Bearer ${token}`;
//         setUser(userData);
//         return true;
//       }
//     } catch (err) {
//       console.error("Login failed:", err.response?.data || err);
//       return false;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     delete api.defaults.headers.Authorization;
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };

//---------------- version 2 ----------------
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/apiClient";
import {jwtDecode} from "jwt-decode";   // ← NAMED IMPORT (no curly braces!)

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);  // ← use jwtDecode()
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
    const token = localStorage.getItem("token");
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
        const token = res.data.token;
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