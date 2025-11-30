// src/context/LayoutContext.jsx
import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("dashboard"); // default page

  return (
    <LayoutContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}