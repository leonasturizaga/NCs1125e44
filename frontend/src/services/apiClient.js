// src/lib/api.js    => src/services/apiClient.js
import axios from "axios";

const api = axios.create({
//   baseURL: "http://localhost:3000/api",  // Cambia por tu backend
  baseURL: "https://testimonial-cms-backend.vercel.app",  
   // baseURL: "https://n-cs1125e44.vercel.app",  
  headers: {
    "Content-Type": "application/json",
  },
});

// Opcional: interceptar token del localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;