//---------------- version 1 ----------------
// src/lib/api.js    => src/services/apiClient.js
// import axios from "axios";

// const api = axios.create({
// //   baseURL: "http://localhost:3000/api",  // Cambia por tu backend
//   baseURL: "https://n-cs1125e44.vercel.app",  
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Opcional: interceptar token del localStorage
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;

//---------------- version 2 ----------------
// src/services/apiClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://n-cs1125e44.vercel.app", // ← your real backend
});

// Automatically add JWT token to ALL requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Let browser set Content-Type for FormData (includes boundary)
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default api;